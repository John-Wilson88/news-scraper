//require modules
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request");
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

			db.article.create(data).then(function(articleData) {
          
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
	db.article.find({}).then(function(articleData){
		res.json(articleData);
	}).catch(function(err){
		res.json(err);
	})
});

}