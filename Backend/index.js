const express = require("express");

const app = express();

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

app.get("/", (req, res) => {
    res.sendFile("views/index.html", {root : __dirname});
    console.log(req.body);
});

app.listen(3001, (req, res) => {
    console.log("Server is listening on port 3001");
});