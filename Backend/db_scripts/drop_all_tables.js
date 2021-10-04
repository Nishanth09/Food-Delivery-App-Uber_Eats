const models = require('../models/all_models')
const base = require("../models/base")

models.restaurants.drop_table((error, results, fileds) => {
    if (error) throw error;
    console.log("restaurants table dropped");
    models.orders.drop_table((error, results, fields) => {
        if (error) throw error;
        console.log("orders table dropped");
        models.users.drop_table((error, results, fields) => {
            if (error) throw error;
            console.log("users table dropped");
            base.mysql_connection_pool.end()
        });
    }); 
});