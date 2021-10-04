const models = require('../models/all_models')
const base = require("../models/base")



models.users.create_table((error, results, fields) => {
    if (error) throw error;
    console.log("user table Created");
    models.restaurants.create_table((error, results, fields) => {
        if (error) throw error;
        console.log("restaurant table Created");
        models.orders.create_table((error, results, fields) => {
            if (error) throw error;
            console.log("orders table Created");
            base.mysql_connection_pool.end()
        })

    })
});

