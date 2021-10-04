const base = require("./base")
const { v4: uuidv4 } = require("uuid")


module.exports.create_table = (table_details, callback) => {
    base.create_table(table_details, callback) 
}

module.exports.drop_table = (table_details, callback) => {
    base.drop_table(table_details, callback) 
}

//single function to support both insert and updat
//Send only stringfied values.
module.exports.save = (table_details, values, callback) => {
    //validation to see the user is not passing wrong keys that doesn't match with the column names
    for(const [key, value] of Object.entries(values)){
        if(!table_details.fields.map(field => field.name).includes(key)){
           throw `Key ${key} not matching with the column name`
        }
    }
    let pk_fields = get_primary_key_fields(table_details)
    if(do_insert(table_details, values)){
        //do a insert query
        for (let pk_field of pk_fields) values[pk_fields] = uuidv4()
        let column_names = Object.keys(values) 
        //let insert_values = Object.values(values).map(val => JSON.stringify(val))
        let insert_values = Object.values(values)
        let prepared_template_pos = "?,".repeat(insert_values.length).slice(0,-1)
        base.insert(table_details.table_name, column_names, insert_values, prepared_template_pos, callback)
    }else{
        //do a update query
        let where_clause = build_where_clause(pk_fields, values)
        let where_clause_values = pk_fields.map(val => values[val])
        //console.log(`where clause values are ${where_clause} ${where_clause_values}`)

        let fields_to_update = Object.keys(values).filter(field =>  !pk_fields.includes(field))
        let set_clause = build_set_clause(fields_to_update, values)
        let set_clause_values = fields_to_update.map(field => values[field]) 
        let update_values = set_clause_values.concat(where_clause_values)
        //console.log(`set clause values are ${set_clause} ${set_clause_values}`)

        base.update(table_details.table_name, where_clause, set_clause, update_values, callback)
   }
}

module.exports.simple_select = (table_details, select_columns, conditions, callback) => {
       //validation to see the user is not passing wrong keys that doesn't match with the column names
       for(const key of select_columns.concat(Object.keys(conditions))){
            if(!table_details.fields.map(field => field.name).includes(key)){
               callback(`Key ${key} not matching with the column name`, [], [])
            }
        }
        let where_clause = build_where_clause(null, conditions)
        let where_clause_values = Object.values(conditions) 

        base.select(table_details.table_name, select_columns, where_clause, where_clause_values, callback) 
}

//Build where clause with `field_names` from dictionary of `values`.
var build_where_clause = (field_names, values, prepared=true) => {
    let where_clause = []
    if (field_names){
        for (let field of field_names) where_clause.push(`${field}=${(prepared)? "?":values[field]}`)
    }else{
        for(const [key, value] of Object.entries(values)){
            where_clause.push(`${key}=${prepared? "?": value}`)
        }
    }
    //this is a must fix because this won't support all options, what if i want to use or??
    where_clause = where_clause.join(" and ")
    return where_clause
}

//for prepared query
var build_set_clause = (field_names, values, prepared=true) => {
    let set_clause = []
    for (let field of field_names) set_clause.push(`${field}=${(prepared)? "?":values[field]}`)
    set_clause = set_clause.join(", ") 
    return set_clause
}
/*
If there are primary keys in values, do an update.
If no primary keys in the values do a Insert.
*/
var do_insert = (table_details, values) => {
    let pk_fields = get_primary_key_fields(table_details)
    let do_insert = true
    for(let pk_field of pk_fields){
       if (pk_field in values) {
           do_insert = false 
        }else{
            if (!do_insert) throw "Specify all primary keys or none!!"
            do_insert = true 
        }
    }
    return do_insert
}

var get_primary_key_fields = (table_details) => {
    let pk_fields = []
    for(let field of table_details.fields){
        if(field.primary_key){
            pk_fields.push(field.name)
        }
    }
    return pk_fields
}