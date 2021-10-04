const models = require('../models/all_models')
const base  = require('../models/base')


let orders_data = [
    {
        "userid": "1",
        "restid": "2",
        "order_status": "ordered",
        "order_items": [{"name": "Chicken Katsu", "price": "20.99"}, 
                        {"name": "Popcorn Shrimp", "price": "25.99"}],
        "price": "48.30",
        "order_time": "2021-09-21 6:00:00"
    }
]

base.select("users", ["userid"], "account_type=?", ["C"], (err, results, fields) => {
    if (err) throw err;
    let userid = results[0]["userid"]
    base.select("restaurants", ["restid"], "name=?", ["Tasty Richards"], (err, results, fields) => {
        if (err) throw err;
        let restid = results[0].restid
        for (let order of orders_data){
            order["userid"] = userid
            order["restid"] = restid
            models.orders.save(order, (err, results, fields) => { 
                if (err) throw err;
                console.log("Inserted order..")
            })
        }
         
    })
})

