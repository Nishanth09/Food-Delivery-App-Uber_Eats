const express = require('express')
const app = express()
const session = require('express-session')
const settings = require('./settings')
const users = require("./models/user_model")
const restaurants = require("./models/restaurants_model")
const session_store = require('./sessions')
const models = require('./models/all_models')
//const cors = require('cors');
const port = 3001
app.use(express.json()) // for parsing application/json
// app.use(cors({
//     origin: 'http://localhost:3000'
// }));
app.use(
    session(
        {
            "key": settings.SESSION_KEY,
            "secret": settings.SESSION_SECRET,
            "cookie": { "maxAge": 360000},
            "resave": false,
            "saveUninitialized": true,
            "store": session_store.store
        }
    )
)

app.use((req,res,next) => {
    console.log(`${req.method} rquest for ${req.url}`)
    if(settings.MODE == "dev"){
        res.append("Access-Control-Allow-Origin","*")
        res.append("Access-Control-Allow-Header", "*")
    }
    next()
})


app.post(`${settings.BASE_API_URL}/login`, (req,res) => {
    const user_name = req.body.username
    const password = req.body.password
    console.log(user_name,password);
    if (!(user_name && password)){
        res.status(401).send("Not Authorized")
        return
    }

    var auth_data = users.simple_select(["userid"], {"username": user_name, "password": password}, (err, results, fields) => {
        if (err){
            console.log(err);
            res.status(500).send("Internal Server Error");
            return
        }

        //Be careful with this check all use cases
        if(results[0] !== undefined ){
            //user is authenticated check for duplicate username
            let userid = results[0].userid
            req.session.userid = userid
            let user_fields = [
                "username",
                "email",
                "account_type"
            ]
            users.simple_select(user_fields, {"userid": req.session.userid}, (err, results, fields) => {
                if (err){
                    console.log(err);
                    res.status(500).end()
                    return
                }
                if(results[0]){
                    let user_obj = {
                        "username": results[0].username,
                        "email": results[0].email,
                        "account_type": results[0].account_type
                    }
                    res.status(200).send(JSON.stringify(user_obj))        
                    return
                } else{
                    res.status(404).end()
                    return
                }
            })
            // console.log(`${user_name} is authorized`)
            // res.status(200).send("User Authorized")
        }else{
           res.status(401).send("Not Authorized")
           return
        }
    })
})


app.get(`${settings.BASE_API_URL}/user_details`, (req, res) => {
    console.log("Requested for user details!", req.session);
    if (req.session.userid){
        let user_fields = [
            "username",
            "nickname",
            "mobile",
            "email",
            "street",
            "city",
            "country",
            "state",
            "zip",
            "fav_restaurant",
            "dob"
        ]
        users.simple_select(user_fields, {"userid": req.session.userid}, (err, results, fields) => {
            if (err){
                console.log(err);
                res.status(500).end()
                return
            }
            if(results[0]){
                let user_obj = {
                    "username": results[0].username,
                    "nickname": results[0].nickname,
                    "mobile": results[0].mobile,
                    "email": results[0].email,
                    "street": results[0].street,
                    "city": results[0].city,
                    "country": results[0].country,
                    "state": results[0].state,
                    "zip": results[0].zip,
                    "fav_restaurant": results[0].fav_restaurant,
                    "dob": results[0].dob,
                }
                res.status(200).send(JSON.stringify(user_obj))        
                return
            }else{
                res.status(404).end()
            }
        })
    }else{
        res.status(401).end()
    }
});

app.post(`${settings.BASE_API_URL}/user_details`, (req, res) => {
    if (req.session.userid) {
        let username = req.body.username
        let nickname = req.body.nickname
        let email = req.body.email
        let mobile = req.body.mobile
        let dob = req.body.dob
        let street = req.body.street
        let city = req.body.city
        let country = req.body.country
        let state = req.body.state
        let fav_restaurant = req.body.fav_restaurant
        let zip = req.body.zip
        let account_type = req.body.account_type
        users.save({
            "username" :username,
            "nickname" : nickname,
            "email" : email,
            "mobile" : mobile,
            "dob" : dob,
            "street" : street,
            "city" : city,
            "country" : country,
            "state" : state,
            "fav_restaurant" : fav_restaurant,
            "zip" : zip,
            "account_type": account_type
        }, (err, results, fields) => {
            if (err){
                console.log(err)
                res.status(500).end()
                return
            }
            res.status(200).send("users details updated successfully");
            return
        })
    } else {
        res.status(401).end()
    }
});

//verify if username already exists
app.post("/signup_user", (req, res) => {
    console.log(req.body);
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    let account_type = "C"
    let dob = "1980-08-21"

    users.save({
        "username": username,
        "password": password,
        "email": email,
        "account_type": account_type,
        "dob": dob
    }, (err, results, fields) => {
        if (err){
            console.log(err)
            res.status(500).end()
            return
        }
        res.status(200).send("Customer Registered successfully");
    })
})

app.post("/signup_owner", (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    let city = req.body.city
    let account_type = "O"
    let dob = "1983-09-21"

    users.save({
        "username": username,
        "password": password,
        "email": email,
        "account_type": account_type,
        "dob": dob,
        "city": city
    }, (err, results, fields) => {
        if (err){
            console.log(err)
            res.status(500).end()
            return
        }
        res.status(200).send("Restaurant Registered successfully");
    })
})

app.get(`${settings.BASE_API_URL}/logout`, (req, res) => {
    console.log(`logging off ${req.session.userid}`)
    req.session.destroy((error) => {
        if (error){
            console.log(error)
            res.status(500).end()
        }
        console.log(`Destroyed session`)
        res.status(200).send("Session destroyed");
    })
})

app.post(`${settings.BASE_API_URL}/restaurant`, (req, res) => {
    console.log(req.session.userid,"====", req.body);
    if (req.session.userid){
        console.log(req.session.userid);
        let rest_data = req.body
        //TODO: image_magic
        rest_data["ownerid"] = req.session.userid
        models.restaurants.save(rest_data, (e, r, f) => {
            if(e) {
                console.log(e);
                res.status(500).end()
                return
            }
            res.status(200).send("successfully added restaurant")
        })
    }else{
        res.status(401).redirect("/")
    }
})

app.get(`${settings.BASE_API_URL}/restaurant`, (req, res) => {
    if (req.session.userid) {
        let restaurantDetails = [
            "name",
            "address",
            "open_timings",
            "close_timings",
            "items"
        ]
        restaurants.simple_select(restaurantDetails, {"ownerid": req.session.userid}, (err, results, fields) => {
            if (err){
                console.log(err);
                res.status(500).end()
                return
            }
            if(results[0]){
                let resDetails = {
                    "name": results[0].name,
                    "address": results[0].address,
                    "open_timings": results[0].open_timings,
                    "close_timings": results[0].close_timings,
                    "items": results[0].items
                }
                res.status(200).send(JSON.stringify(resDetails))        
                return
            }else{
                res.status(404).end()
            }
        })
    } else {
        res.status(401).end();
    }
})

app.get(`${settings.BASE_API_URL}/get_all_restaurants`, (req, res) => {
    if (req.session.userid) {
        let restaurantDetails = [
            "name",
            "address",
            "open_timings",
            "close_timings",
            "items"
        ]
        // for getting state
        let state = null;
        users.simple_select(["state"], {"userid": req.session.userid}, (err, results, fields) => {
            if (err){
                console.log(err);
                res.status(500).end()
                return
            }
            if(results[0]){
                state = results[0].state; 
            }
        })

        console.log("state",state)




        restaurants.simple_select(restaurantDetails, {}, (err, results, fields) => {
            if (err){
                console.log(err);
                res.status(500).end()
                return
            }
            if(results[0]){
                let rDetails = [];
                for (let res of results) {
                    let resDetails = {
                        "name": res.name,
                        "address": res.address,
                        "open_timings": res.open_timings,
                        "close_timings": res.close_timings,
                        "items": res.items
                    }
                    rDetails.push(resDetails)
                }
                console.log(rDetails);
                
                res.status(200).send(JSON.stringify(rDetails))        
                return
            } else {
                res.status(404).end()
                return
            }
        })
    }
    else {
        res.status(401).end();
        return
    }
})

app.get(`${settings.BASE_API_URL}/get_delivery_restaurants`, (req, res) => {
    if (req.session.userid) {
        
    }
    else {
        res.status(401).end();
        return
    }
})

app.put(`${settings.BASE_API_URL}/restaurant`, (req, res) => {
    if (req.session.userid){
        console.log(req.session.userid);
        let rest_data = req.body.data
        //get rest id

        rest_data["restid"] = restid
        rest_data["ownerid"] = req.session.userid
        models.restaurants.save(rest_data, (e, r, f) => {
            if(e) {
                res.send(500)
                return
            }
            res.send(200)
        })
    }else{
        res.status(401).redirect("/")
    }

})


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
