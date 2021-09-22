const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'cmpe_273_uber_eats',
    resave: false,
    saveUninitialized: true,
    duration: 60 * 60 * 1000, 
    activeDuration: 5 * 60 * 1000,
}));

const restaurantData = [
    {
        "name" : "Restaurant 1",
    }
]

const userCreds = {
    "name" : "nishanth",
    "password" : "password"
}

const serviceProvider = "Uber Eats";

app.post("/login", (req, res) => {
    res.send("Received Successfully");
    console.log(req.body);
});

app.post("/signup", (req, res) => {
    res.send("registered!");
    console.log(req.body);
});

app.listen(3001, (req, res) => {
    console.log("Server is listening on port 3001");
});