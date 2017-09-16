var Twitter = require('twitter');
var request = require('request');
var keys = require('./keys.js');
var spotify = require('node-spotify-api');
var fs = require('fs');
var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});
var spotifySong = new spotify({
	id: 'e68a6c3a67754e6988f34f5895b325e6',
	secret: 'c8149600924c4fb6add0d8e2866ad5d5',
});
var request1 = process.argv[2];
var result = process.argv[3];
for (var i = 4; i < process.argv.length; i++) {
    result = result + "+" + process.argv[i];
};
var secondRequest = process.argv[3];
switch (request1) {
	case "my-tweets":
		myTwitter();
		break;
	case "spotify-this-song":
		spotifyThis();
		break;
	case "movie-this":
		liriMovie();
		break;
	case "do-what-it-says":
		fsThis();
};
function myTwitter(){
	var params = {screen_name: 'liri_node'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
    		for(var i = 0; i < 5; i++) {
    			console.log(tweets[i].text)
    		};
  		}else {
  			console.log(error);
  		};
	});
};
function fsThis() {
	fs.readFile(__dirname + "/random.txt",'utf8', function(err, data) {
		console.log(data)
	});
};
function spotifyThis() {
	spotifySong.search({ type: 'track', query: result }, function(err, data) {
    	if ( err ) {
        console.log('Error occurred: ' + err);
        return;
   		}else {
   			console.log('Artist: ' + data.tracks.items[0].artists[0].name + "\nTitle: " + data.tracks.items[0].name + "\nPreview: " + data.tracks.items[0].href + "\nAlbum: "+ data.tracks.items[0].album.name);
   		}
	});
}
function liriMovie() {
	request('http://www.omdbapi.com/?t=' + result + '&apikey=40e9cece', function (error, response, body) {
  	var trueResponse = JSON.parse(response.body);
  	console.log("Title: " + trueResponse.Title + "\nRelease Date: " + trueResponse.Released + "\nIMDB Rating: " + trueResponse.imdbRating + "\nRotten Tomatoes Rating: " + trueResponse.Metascore + "%\nCountry: " + trueResponse.Country + "\nPlot: " + trueResponse.Plot + "\nActors: " + trueResponse.Actors)
	});
}