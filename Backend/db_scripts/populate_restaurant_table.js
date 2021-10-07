const models = require('../models/all_models')
const base = require('../models/base')

let rest_data = [
    {
        "ownerid": "44848bd4-5a15-46b3-87ad-d522c4212ace",
        "name": "Tasty Richards",
        "resimg": "img",
        "items": [
            {
                "name" : "Chicken Katsu",
                "image" : "http://localhost:3001/chicken_katsu.webp",
                "description" : "chicken with katsu mixed with it",
                "price" : "$20.99",
                "main_ingredients": "chicken",
                "category": "Main Course"
            },
            {
                "name" : "Hawaiian BBQ",
                "image" : "http://localhost:3001/hawaiin_bbq.webp",
                "description" : "combo chicken and short ribs",
                "price" : "$12.99",
                "main_ingredients": "chicken",
                "category": "Main Course"
            },
            {
                "name" : "Popcorn Shrimp",
                "image" : "http://localhost:3001/popcorn_shrimp.webp",
                "description" : "served with french fries",
                "price" : "$25.99",
                "main_ingredients": "chicken",
                "category": "Starter"
            },
            {
                "name" : "Fish and Chips",
                "image" : "http://localhost:3001/fish_chips.webp",
                "description" : "served with coke and fries",
                "main_ingredients": "chicken",
                "price" : "$21.99",
                "category": "Starter"
            }        
        ],
        "dietary": "Non-veg",
        "mode": "both",
        "address": "345 S Main St, San Jose, 93134",
        "open_timings": "06:00",
        "close_timings": "21:00"
    }
]


base.select("users", ["userid"], "account_type=?", ["O"],  (err, results, fields) => {
    if(err) throw err;
    let userid = results[0].userid
    for(let rest of rest_data) {
        rest["ownerid"] = userid
        models.restaurants.save(rest, (err, results, fields) => {
        if (err) throw err;
        console.log("Inserted rest...")
    })
    }
})
