
const base = require("./base.js")
const db_ops = require("./db_ops")
const { v4: uuidv4 } = require("uuid")

/*
        {
            "name": "",
            "type": "",
            "not_null": 
        },
*/
const restaurants_table = {
    "table_name": "restaurants",
    "fields": [
        {
            "name": "restid",
            "type": "CHAR(36)",
            "not_null": true, 
            "primary_key": true 
        },
        {
            "name": "ownerid",
            "type": "CHAR(36)",
            "not_null": true,
            "foreign_key": "users(userid)"
        },
        {
            "name": "name",
            "type": "VARCHAR(20)",
            "not_null": true,
        },
        {
            "name": "items",
            "type": "JSON",
            "not_null": true, 
        },
        {
            "name": "address",
            "type": "TEXT",
            "not_null": true,
        },
        {
            "name": "open_timings",
            "type": "TIME",
            "not_null": true,
        },
        {
            "name": "close_timings",
            "type": "TIME",
            "not_null": true,
        }
    ]
}


module.exports.create_table = (callback) => {
    db_ops.create_table(restaurants_table, callback)
}

module.exports.drop_table = (callback) => {
    db_ops.drop_table(restaurants_table, callback)
}

module.exports.save = (values, callback) => {
   db_ops.save(restaurants_table, values, callback)
}

module.exports.simple_select = (select_columns, conditions, callback) => {
    db_ops.simple_select(restaurants_table, select_columns, conditions, callback)
}
