const models = require('../models/all_models')

users_data =[
    {
        "username": "johndoe",
        "password": "lolthisisstupid",
        "nickname": "john",
        "mobile": "+13456680984",
        "email": "jdoe@example.com",
        "street": "1234 hello st",
        "city": "san jose",
        "state": "CA",
        "country": "USA",
        "zip": "12345",
        "account_type": "C",
        "dob": "1983-12-31"

    },
    {
        "username": "Ritche",
        "password": "crazyrich",
        "nickname": "Richard",
        "mobile": "+13234562344",
        "email": "richard@example.com",
        "street": "0000 richman ln",
        "city": "san jose",
        "state": "CA",
        "country": "USA",
        "zip": "91234",
        "account_type": "O",
        "dob": "1963-11-21"

    },
]


for(let user of users_data) {
    models.users.save(user, (err, results, fields) => {
        if (err) throw err;
        console.log("Inserted user...")
    })
}
