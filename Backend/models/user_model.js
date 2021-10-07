const db_ops = require("./db_ops")
const base = require("./base.js")
const { v4: uuidv4 } = require("uuid")
/*
        {
            "name": "",
            "type": "",
            "not_null": 
        }
*/
const users_table = {
    "table_name": "users",
    "fields": [
        {
            "name": "userid",
            "type": "CHAR(36)",
            "not_null": true,
            "primary_key": true
        },
        {
            "name": "username",
            "type": "VARCHAR(20)",
            "not_null": true,
        },
        {
            "name": "password",
            "type": "VARCHAR(40)",
            "not_null": true
        },
        {
            "name": "nickname",
            "type": "VARCHAR(40)",
        },
        {
            "name": "mobile",
            "type": "VARCHAR(15)",
            "unique": true,
        },
        {
            "name": "email",
            "type": "VARCHAR(30)",
            "not_null": true,
            "unique": true,
        },
        {
            "name": "street",
            "type": "VARCHAR(20)"
        },
        {
            "name": "city",
            "type": "VARCHAR(20)"
        },
        {
            "name": "country",
            "type": "VARCHAR(20)"
        },
        {
            "name": "state",
            "type": "VARCHAR(20)"
        },
        {
            "name": "zip",
            "type": "VARCHAR(20)"
        },
        {
            "name": "fav_restaurant",
            "type": "TEXT(300)"
        },
        {
            "name": "account_type",
            "type": "CHAR(1)",
            "not_null": true
        },
        {
            "name": "address",
            "type": "CHAR(36)"
        },
        {
            "name": "dob",
            "type": "DATE",
            "not_null": true
        }
    ]
}


module.exports.create_table = (callback) => {
    db_ops.create_table(users_table, callback)
}

module.exports.drop_table = (callback) => {
    db_ops.drop_table(users_table, callback)
}

module.exports.save = (values, callback) => {
    db_ops.save(users_table, values, callback)
}

module.exports.simple_select = (select_columns, conditions, callback) => {
    db_ops.simple_select(users_table, select_columns, conditions, callback)
}

