//import * as settings from '../settings.js';
/*
Any callback passed to this functions should be of the format

callback(error, result, fields)
*/
const settings = require("../settings")
const mysql = require("mysql2");

const mysql_connection_pool = mysql.createPool({
    connectionLimit   : 10,
    host              : settings.MYSQL_HOST,
    user              : settings.MYSQL_USER,
    port              : settings.MYSQL_PORT,
    password          : settings.MYSQL_PASSWORD,
    database          : settings.MYSQL_DATABASE,
    multipleStatements: true 
});

module.exports.mysql_connection_pool = mysql_connection_pool

//pool events (helps with more debugging)


mysql_connection_pool.on('acquire', function (connection) {
    //console.log('Connection %d acquired', connection.threadId);
  });

mysql_connection_pool.on('enqueue', function () {
    //console.log('Waiting for available connection slot');
  });

mysql_connection_pool.on('release', function (connection) {
    //console.log('Connection %d released', connection.threadId);
  });

var create_table_query = (table_details) => {
    let field_def = []
    for (let field of table_details.fields) {
        let temp = `${field.name} ${field.type}`
        //put all the constraints here  
        if (field.not_null) temp+=` NOT NULL`;
        if (field.primary_key) temp+=`,PRIMARY KEY(${field.name})`;
        if (field.foreign_key) temp+=`,FOREIGN KEY(${field.name}) REFERENCES ${field.foreign_key}`;
        if (field.unique) temp+=`,UNIQUE(${field.name})`;
        field_def.push(temp)
    }
    field_def = field_def.join(",")
    let create_query = `CREATE TABLE IF NOT EXISTS ${table_details.table_name} (${field_def});`
    return create_query;
}


var query_pool = (query, callback) => {
    mysql_connection_pool.getConnection(function(err, connection){
        if (err) {
            //connection.release();
            throw err
        }
        console.log(`Obtained connection executing query ${query} `)
        connection.query(query, function(error, results, fields){
            console.log("Query completed");
            //Do your stuff here.
            //console.log(fields)
            if (error) throw error;
            if (callback) callback(error,results,fields);
        });
        mysql_connection_pool.releaseConnection(connection);
    })
}

var query_direct = (query, callback) => {
    console.log(`executing query ${query}`)
    mysql_connection_pool.query(query, function(error, results, fields){
        if (callback) callback(error, results, fields);
    });
}

var query_prepared = (prepared_query, template_values, callback) => {
    console.log(`executing prepared query ${prepared_query}, [${template_values.join(",")}]`)
    mysql_connection_pool.execute(prepared_query, template_values, (err, results, fields) => {
        if (callback) callback(err, results, fields);
    } )
}

//Make sure you trust this query to avoid SQL Injections.
module.exports.raw_query_select = (query, callback) => {
    console.log("Using connection pool to query....");
    query_pool(query, callback);

}

module.exports.create_table = (table_details, callback) => {
    console.log(`Using connection pool to create table ${table_details.table_name}....`);
    let query = create_table_query(table_details);
    query_direct(query, callback)
}

module.exports.drop_table = (table_details, callback) => {
    console.log(`Using connection pool to drop table ${table_details.table_name}....`);
    let query = `SET foreign_key_checks=0;DROP TABLE IF EXISTS ${table_details.table_name};SET foreign_key_checks=1;` 
    query_direct(query, callback)
}

module.exports.update = (table_name, where_clause, set_clause, update_values, callback) => {
    console.log("Updating records..")
    let query = `UPDATE ${table_name} SET ${set_clause} WHERE ${where_clause}`
    console.log(query)
    console.log(update_values)
    query_prepared(query, update_values, callback)
}

module.exports.insert = (table_name, column_names, insert_values, prepared_template_pos, callback) => {
    console.log("inserting records..")
    let query = `INSERT INTO ${table_name} (${column_names.join(',')}) VALUES(${prepared_template_pos})`
    console.log(query)
    console.log(insert_values)
    query_prepared(query, insert_values, callback)
}

module.exports.select = (table_name, columns, conditions_clause_template, template_values, callback) => {
    let query = `SELECT ${columns.join(',')} FROM ${table_name} ${conditions_clause_template === ""? "": "WHERE "+conditions_clause_template}`
    query_prepared(query, template_values, callback)
}