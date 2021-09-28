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
        "id" : "0",
        "restaurantImage" : "http://localhost:3001/starbird_chicken.jpeg",
        "name" : "Starbird Chicken"
    },
    {
        "id" : "1",
        "restaurantImage" : "http://localhost:3001/tender_greens.jpeg",
        "name" : "Tender Greens"
    },
    {
        "id" : "2",
        "restaurantImage" : "http://localhost:3001/fire_biryani.jpeg",
        "name" : "Fire Biryani"
    },
    {
        "id" : "3",
        "restaurantImage" : "http://localhost:3001/guilin_noodles.jpeg",
        "name" : "Tirupathi Bhimas"
    },
    {
        "id" : "4",
        "restaurantImage" : "http://localhost:3001/jack_in_the_box.jpeg",
        "name" : "Tirupathi Bhimas"
    },
    {
        "id" : "5",
        "restaurantImage" : "http://localhost:3001/mcdonalds.jpeg",
        "name" : "Tirupathi Bhimas"
    },
    {
        "id" : "6",
        "restaurantImage" : "http://localhost:3001/tacobell.jpeg",
        "name" : "Tirupathi Bhimas"
    },
    {
        "id" : "7",
        "restaurantImage" : "http://localhost:3001/tirupathi_bhimas.jpeg",
        "name" : "Tirupathi Bhimas"
    }
];

const dishDetails = [
    {
        "id" : "0",
        "dishName" : "Chicken Katsu",
        "dishImage" : "http://localhost:3001/chicken_katsu.webp",
        "description" : "chicken with katsu mixed with it",
        "price" : "$20.99"
    },
    {
        "id" : "1",
        "dishName" : "Hawaiian BBQ",
        "dishImage" : "http://localhost:3001/hawaiin_bbq.webp",
        "description" : "combo chicken and short ribs",
        "price" : "$12.99"
    },
    {
        "id" : "2",
        "dishName" : "Popcorn Shrimp",
        "dishImage" : "http://localhost:3001/popcorn_shrimp.webp",
        "description" : "served with french fries",
        "price" : "$25.99"
    },
    {
        "id" : "3",
        "dishName" : "Fish and Chips",
        "dishImage" : "http://localhost:3001/fish_chips.webp",
        "description" : "served with coke and fries",
        "price" : "$21.99"
    }
]

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

app.get("/getDishes", (req, res) => {
    res.send(dishDetails);
    console.log(req.body);
})

app.post("/signup", (req, res) => {
    res.send("registered!");
    console.log(req.body);
});

app.listen(3001, (req, res) => {
    console.log("Server is listening on port 3001");
});