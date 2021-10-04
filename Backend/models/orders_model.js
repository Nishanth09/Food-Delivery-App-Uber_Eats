//import * as base from './base.js'

const db_ops = require("./db_ops")
const base = require("./base.js")

/*
        {
            "name": "",
            "type": "",
            "not_null": 
        },



*/
const orders_table = {
    "table_name": "orders",
    "fields": [
        {
            "name": "orderid",
            "type": "CHAR(36)",
            "not_null": true,
            "primary_key": true
        },
        {
            "name": "userid",
            "type": "CHAR(36)",
            "not_null": true,
            "foreign_key": "users(userid)"
        },
        {
            "name": "restid",
            "type": "CHAR(36)",
            "not_null": true, 
            "foreign_key": "restaurants(restid)"
        },
        {
            "name": "order_status",
            "type": "VARCHAR(20)",
            "not_null": true,
        },
        {
            "name": "order_items",
            "type": "JSON",
            "not_null": true, 
        },
        {
            "name": "price",
            "type": "FLOAT(2)",
            "not_null": true,
        },
        {
            "name": "order_time",
            "type": "DATETIME",
            "not_null": true,
        }
    ]
}

module.exports.create_table = (callback) => {
    db_ops.create_table(orders_table, callback)
}

module.exports.drop_table = (callback) => {
    db_ops.drop_table(orders_table, callback)
}

module.exports.save = (values, callback) => {
    db_ops.save(orders_table, values, callback)
}

module.exports.simple_select = (select_columns, conditions, callback) => {
    db_ops.simple_select(orders_table, select_columns, conditions, callback)
}
