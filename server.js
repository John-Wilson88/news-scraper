//Node Modules
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const request = require("request");
//const db = require("./models");

//App
const app = express();

// PORT
const PORT = process.env.PORT || 3000;

//Routes
// const routes = 
require("./routes/api-routes.js")(app);

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Create connection to DB
mongoose.connect("mongodb://localhost/newsScraperDB");

app.listen(PORT, function(){
	console.log("News Scraper is listening on http://localhost/" + PORT);
});