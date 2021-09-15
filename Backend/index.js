const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(3001, (req, res) => {
    console.log("Server is listening on port 3001");
});