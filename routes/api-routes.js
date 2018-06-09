//require modules
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request");
const mongojs = require("mongojs");

const db = require("../models");

module.exports = function (app) {
// GET request for scraping articles from cleveland.com, and sending them to the DB.

app.get("/scrape", function(req, res) {
	request("https://www.wsj.com/", (error, response, html) => {

		const $ = cheerio.load(html);

		$("div.LS-SECONDARY-ALT").each((i, element) => {

			let data = {};
			
			data.headline = $(element).children('h3').text();
			data.summary = $(element).children('div').text();
			data.link = $(element).children().attr('href');

			db.articles.create(data).then(function(articleData) {
          
          		//console.log(articleData);

        	}).catch(function(err) {
          
          		return res.json(err);

        	});	
		});
		
	});

	res.send("Scrape Complete");
});

// GET request for retreieving all the scraped articles for dislplaying.
app.get("/articles", function(req, res){
	db.articles.find({}).then(function(articleData){
		res.json(articleData);
	}).catch(function(err){
		res.json(err);
	});
});

app.get("/:id", function(req, res){

	console.log(req.params.id);

	mongoose.articles.find({_id: req.params.id}).then((articleData) => {
		res.json(articleData);
	}).catch((err) => {
		res.json(err);
	});
});


app.get("/", function(req, res){
	db.articles.find({}).then((articleData) => {

		res.render("index", {articleData: articleData});

	}).catch((err) => {
		res.json(err);
	});
});

app.delete("/:id", function(req, res){

	db.articles.deleteOne({_id: req.params.id}).then( () => {
		console.log("article deleted");
	}).catch((err) => {
		console.log(err);
	});
});



}