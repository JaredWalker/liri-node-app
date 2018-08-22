require('dotenv').config();

var fs = require('fs');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var moment = require('moment');
var readline = require('readline');
var request = require('request');


searchItem = searchItem.trim();

switch (command) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhat();
        break;
    default:
        break;
};
function spotify(inputs) {

	var spotify = new Spotify(keys.spotifyKeys);
		if (!inputs){
        	inputs = 'The Sign';
    	}
		spotify.search({ type: 'track', query: inputs }, function(err, data) {
			if (err){
	            console.log('Error occurred: ' + err);
	            return;
	        }

	        var songInfo = data.tracks.items;
	        console.log("Artist(s): " + songInfo[0].artists[0].name);
	        console.log("Song Name: " + songInfo[0].name);
	        console.log("Preview Link: " + songInfo[0].preview_url);
	        console.log("Album: " + songInfo[0].album.name);
	});
}
function movie(inputs) {

	var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body) {
		if (!inputs){
        	inputs = 'Mr Nobody';
    	}
		if (!error && response.statusCode === 200) {

		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		    console.log("Country: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Plot: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
};

function concertThis() {
    request("https://rest.bandsintown.com/artists/" + searchItem + "/events?app_id=f894bf9c5728ecd24da5e70f7342e9c7", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            dataLine1 = "This band is playing at " + JSON.parse(body)[0].venue.name + ", " + JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.region + ", " + JSON.parse(body)[0].venue.country;
            dataLine2 = moment(JSON.parse(body)[0].datetime).format('MM/DD/YYYY');
            console.log(dataLine1);
            console.log(dataLine2);
            logFile();
        }
    });
};





