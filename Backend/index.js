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
app.use(express.static('public/uploads'));

const restaurantData = [
    {
        "name" : "Restaurant 1",
    }
];

const restaurantDetails = [
    {
        "restaurantImage" : "http://localhost:3001/starbird_chicken.jpeg",
        "name" : "Starbird Chicken"
    },
    {
        "restaurantImage" : "http://localhost:3001/tender_greens.jpeg",
        "name" : "Tender Greens"
    },
    {
        "restaurantImage" : "http://localhost:3001/fire_biryani.jpeg",
        "name" : "Fire Biryani"
    },
    {
        "restaurantImage" : "http://localhost:3001/guilin_noodles.jpeg",
        "name" : "Tirupathi Bhimas"
    },
    {
        "restaurantImage" : "http://localhost:3001/jack_in_the_box.jpeg",
        "name" : "Tirupathi Bhimas"
    },
    {
        "restaurantImage" : "http://localhost:3001/mcdonalds.jpeg",
        "name" : "Tirupathi Bhimas"
    },
    {
        "restaurantImage" : "http://localhost:3001/tacobell.jpeg",
        "name" : "Tirupathi Bhimas"
    },
    {
        "restaurantImage" : "http://localhost:3001/tirupathi_bhimas.jpeg",
        "name" : "Tirupathi Bhimas"
    }
];

const userCreds = {
    "name" : "nishanth",
    "password" : "password"
}

const serviceProvider = "Uber Eats";

app.post("/login", (req, res) => {
    res.send(restaurantDetails);
    console.log(req.body);
});

app.get("/getAllRestaurants", (req, res) => {
    res.send(restaurantDetails);
    console.log(req.body);
})

app.post("/signup", (req, res) => {
    res.send("registered!");
    console.log(req.body);
});

app.listen(3001, (req, res) => {
    console.log("Server is listening on port 3001");
});