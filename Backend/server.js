const express = require('express')
const app = express()
const session = require('express-session')
const settings = require('./settings')
const users = require("./models/user_model")
const restaurants = require("./models/restaurants_model")
const orders = require("./models/orders_model")
const session_store = require('./sessions')
const models = require('./models/all_models')
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require("uuid")
const path = require('path');



//const cors = require('cors');
const port = 3001
app.use(express.json()) // for parsing application/json
app.use('/api/static',express.static(settings.STATIC_PATH))
app.use('/static', express.static(settings.STATIC_BUID_PATH))
app.use(fileUpload())
app.use(
    session(
        {
            "key": settings.SESSION_KEY,
            "secret": settings.SESSION_SECRET,
            "cookie": { "maxAge": 3600000},
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

let routes = ["/", "/login","/restaurantLogin","/signup","/restaurantSignup","/profile","/orders","/favorites","/restaurantpage","/checkout","/dashboard", "/home"]

for(route of routes){
    app.get(route, function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
      });
}


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
        console.log("login res: ",results)
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
                console.log("login res: ",results)
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

//verify if username already exists
app.post(`${settings.BASE_API_URL}/signup_user`, (req, res) => {
    console.log(req.body);
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    let account_type = "C"
    let dob = req.body.dob

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

app.post(`${settings.BASE_API_URL}/signup_owner`, (req, res) => {
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

app.get(`${settings.BASE_API_URL}/user_details`, (req, res) => {
    console.log("Requested for user details!", req.session);
    if (req.session.userid){
        let user_fields = [
            "username",
            "userimage",
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
                    "userid": req.session.userid,
                    "userimage": results[0].userimage,
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
        let userid = req.session.userid
        let userimage = req.body.userimage
        let nickname = req.body.nickname
        let mobile = req.body.mobile
        let email = req.body.email
        let dob = req.body.dob
        let street = req.body.street
        let state = req.body.state
        let city = req.body.city
        let country = req.body.country
        let fav_restaurant = req.body.fav_restaurant
        let zip = req.body.zip
        users.save({
            "userid" : userid,
            "userimage" : userimage,
            "nickname" : nickname,
            "mobile" : mobile,
            "email" : email,
            "dob" : dob,
            "street" : street,
            "city" : city,
            "country" : country,
            "state" : state,
            "fav_restaurant" : fav_restaurant,
            "zip" : zip,
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
        //rest_data["restid"] = req.body.restid
        rest_data["ownerid"] = req.session.userid
        console.log("rest_data", rest_data)
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

app.put(`${settings.BASE_API_URL}/restaurant`, (req, res) => {
    if (req.session.userid){
        console.log(req.session.userid);
        let rest_data = req.body
        //get rest id
        rest_data["ownerid"] = req.session.userid
        models.restaurants.save(rest_data, (e, r, f) => {
            if(e) {
                res.status(500).end()
                return
            }
            res.status(200).send("Successfully updated restaurant")
        })
    }else{
        res.status(401).redirect("/")
    }

})

app.get(`${settings.BASE_API_URL}/restaurant`, (req, res) => {
    if (req.session.userid) {
        let restaurantDetails = [
            "restid",
            "resimg",
            "name",
            "address",
            "open_timings",
            "close_timings",
            "items",
            "state",
            "dietary",
            "mode"
        ]
        restaurants.simple_select(restaurantDetails, {"ownerid": req.session.userid}, (err, results, fields) => {
            if (err){
                console.log(err);
                res.status(500).end()
                return
            }
            if(results[0]){
                let resDetails = {
                    "restid": results[0].restid,
                    "resimg": results[0].resimg,
                    "name": results[0].name,
                    "address": results[0].address,
                    "open_timings": results[0].open_timings,
                    "close_timings": results[0].close_timings,
                    "items": results[0].items,
                    "state": results[0].state,
                    "mode": results[0].mode,
                    "dietary": results[0].dietary
                }
                console.log("****",resDetails)
                res.status(200).send(resDetails)        
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
        console.log("user id in get all : ", req.session.userid);
        let restaurantDetails = [
            "restid",
            "resimg",
            "name",
            "address",
            "open_timings",
            "close_timings",
            "items",
            "description",
            "mode",
            "dietary"
        ]
        console.log("params : ", req.query.city);
        if(req.query.city) {
            console.log("city not null")
            restaurants.simple_select(restaurantDetails, {"state" : req.query.city}, (err, results, fields) => {
                if (err){
                    console.log(err);
                    res.status(500).end()
                    return
                }
                if(results[0]){
                    let rDetails = [];
                    for (let res of results) {
                        let resDetails = {
                            "restid": res.restid,
                            "resimg":res.resimg,
                            "name": res.name,
                            "address": res.address,
                            "open_timings": res.open_timings,
                            "close_timings": res.close_timings,
                            "items": res.items,
                            "description": res.description,
                            "mode": res.mode,
                            "dietary": res.dietary
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
        } else {
            console.log("city null")
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
                            "restid": res.restid,
                            "resimg": res.resimg,
                            "name": res.name,
                            "address": res.address,
                            "open_timings": res.open_timings,
                            "close_timings": res.close_timings,
                            "items": res.items,
                            "description": res.description,
                            "mode": res.mode,
                            "dietary": res.dietary
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
    }
    else {
        res.status(401).end("unauthorized");
        return
    }
})

app.get(`${settings.BASE_API_URL}/get_restaurant`, (req, res) => {
    if (req.session.userid) {
        console.log(req.session.userid,"*****",req.query.restid)
        let restaurantDetails = [
            "resimg",
            "name",
            "description",
            "address",
            "items",
            "open_timings",
            "close_timings"
        ]
        restaurants.simple_select(restaurantDetails, {"restid" : req.query.restid}, (err, results, fields) => {
            if (err){
                console.log(err);
                res.status(500).end()
                return
            }
            if(results[0]){
                let rDetails = [];
                for (let res of results) {
                    let resDetails = {
                        "restid": req.query.restid,
                        "resimg":res.resimg,
                        "name": res.name,
                        "address": res.address,
                        "open_timings": res.open_timings,
                        "close_timings": res.close_timings,
                        "items": res.items,
                        "description": res.description
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

app.post(`${settings.BASE_API_URL}/order`, (req, res) => {
    console.log(req.session.userid,"====", req.body);
    if (req.session.userid){
        let rest_data = req.body
        //rest_data["restid"] = req.body.restid
        rest_data["userid"] = req.session.userid
        console.log("rest_data", rest_data)
        models.orders.save(rest_data, (e, r, f) => {
            if(e) {
                console.log(e);
                res.status(500).end()
                return
            }
            res.status(200).send("order placed successfully")
        })
    }else{
        res.status(401).redirect("/")
    }
})

app.post(`${settings.BASE_API_URL}/favorites`, (req, res) => {
    console.log(req.session.userid,"====", req.body);
    if (req.session.userid){
        let rest_data = req.body
        //rest_data["restid"] = req.body.restid
        rest_data["userid"] = req.session.userid
        console.log("rest_data", rest_data)
        users.save(rest_data, (e, r, f) => {
            if(e) {
                console.log(e);
                res.status(500).end()
                return
            }
            res.status(200).send("added to favorites")
        })
    }else{
        res.status(401).redirect("/")
    }
})

// app.get(`${settings.BASE_API_URL}/get_favorites`, (req, res) => {
//     if (req.session.userid) {
//         console.log(req.session.userid,"*****")
//         let restaurantDetails = [
//             "resimg",
//             "name",
//             "description",
//             "address",
//             "items",
//             "open_timings",
//             "close_timings"
//         ]
//         restaurants.simple_select(restaurantDetails, {"restid" : req.query.restid}, (err, results, fields) => {
//             if (err){
//                 console.log(err);
//                 res.status(500).end()
//                 return
//             }
//             if(results[0]){
//                 let rDetails = [];
//                 for (let res of results) {
//                     let resDetails = {
//                         "restid": req.query.restid,
//                         "resimg":res.resimg,
//                         "name": res.name,
//                         "address": res.address,
//                         "open_timings": res.open_timings,
//                         "close_timings": res.close_timings,
//                         "items": res.items,
//                         "description": res.description
//                     }
//                     rDetails.push(resDetails)
//                 }
//                 console.log(rDetails);
                
//                 res.status(200).send(JSON.stringify(rDetails))        
//                 return
//             } else {
//                 res.status(404).end()
//                 return
//             }
//         })
//     }
//     else {
//         res.status(401).end();
//         return
//     }
// })


app.get(`${settings.BASE_API_URL}/get_orders`, (req, res) => {
    if (req.session.userid) {
        console.log(req.session.userid,"*****")
        let orderDetails = [
            "orderid",
            "restid",
            "order_status",
            "order_items",
            "price",
            "delivery_address",
            "order_time",
        ]
        orders.simple_select(orderDetails, {"userid" : req.session.userid}, (err, results, fields) => {
            if (err){
                console.log(err);
                res.status(500).end()
                return
            }
            if(results[0]){
                let details = [];
                for (let res of results) {
                    let odrDetails = {
                        "orderid": res.orderid,
                        "restid": res.restid,
                        "order_status":res.order_status,
                        "order_items": res.order_items,
                        "price": res.price,
                        "delivery_address": res.delivery_address,
                        "order_time": res.order_time,
                    }
                    details.push(odrDetails)
                }
                console.log(details);
                
                res.status(200).send(JSON.stringify(details))        
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

app.get(`${settings.BASE_API_URL}/get_customer_orders`, (req, res) => {
    if (req.session.userid) {
        console.log(req.session.userid,"*****")

        models.restaurants.simple_select(["restid"], {"ownerid": req.session.userid}, 
        (restq_e, restq_r, restq_f) => {
            if (restq_e) {
                console.log(restq_e)
                res.status(500).end()
                return
            }
            let restid = null
            if(restq_r[0]){
                restid = restq_r[0].restid
            }
            let raw_join_query = `select o.orderid, o.userid, o.order_status, o.order_items, o.delivery_address, o.price, u.username, u.nickname, u.mobile, u.email from orders as o INNER JOIN users as u on o.userid=u.userid where o.restid='${restid}'`
            models.base.raw_query_select(raw_join_query, (rq_e, rq_r, rq_f) => {
                if (rq_e) {
                    console.log(rq_e)
                    res.status(500).end()
                }
                let all_orders = []
                if(rq_r[0]){
                    for(let order of rq_r){
                        all_orders.push(order)
                    }
                }
                res.send(all_orders)
            })
        })
    }
    else {
        res.status(401).end();
        return
    }
})

app.post(`${settings.BASE_API_URL}/order_update`, (req, res) => {
    console.log(req.session.userid,"====", req.body);
    if (req.session.userid){
        let order_data = req.body
        orders.save(order_data, (e, r, f) => {
            if(e) {
                console.log(e);
                res.status(500).end()
                return
            }
            res.status(200).send("order updated successfully")
        })
    }else{
        res.status(401).redirect("/")
    }
})

app.post('/api/upload_image', function(req, res) {
    let dishImage;
    let uploadPath;
    console.log(req.files)
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    dishImage= req.files.file;
    file_format = dishImage.name.split(".").length == 2 ? dishImage.name.split(".")[1] : ""
    let saving_filename = uuidv4() + "." + file_format
    uploadPath = settings.STATIC_PATH + "/images/" +  saving_filename;
    console.log(uploadPath)
    dishImage.mv(uploadPath, function(err) {
      if (err){
          console.log(err)
        return res.status(500).send(err);
      }
  
      res.send({"file_path": saving_filename});
    });
  });


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
