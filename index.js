var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');

const port = process.env.PORT || 3001;

app.use(express.static('public'));
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, () => {
	console.log('Listening on port ' + port);
})
app.get("/", (req, res) => {
	let data = [];
	request('http://giaitri.vnexpress.net/', (err, respone, body) => {
	  	if (!err && respone.statusCode == 200) {
	  		let $ = cheerio.load(body);
	  		ds = $(body).find('ul#news_home > li');
	  		ds.each(function(i, e) {
	  			let href = $(this).find('.txt_link').first().attr('href')
	  			request(href, (err, respone, body) => {
	  				if(!err && respone.statusCode == 200) {
	  					let $ = cheerio.load(body);
	  					console.log(i);
	  					data[i] = $('#left_calculator').html();
	  				} else console.log(err);
	  			});
	  		});
	  		setTimeout(function(){
		  		res.render('index', {html: data});
	  		}, 1*1000*10);
	  	}
	  	else console.log(err)
	});
})
