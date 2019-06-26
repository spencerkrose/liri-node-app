require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment'); 
moment().format();

var command = process.argv[2];
var mediaInfo = process.argv.slice(3).join(" ");

function checkUserInput(placeHolder1, placeholder2) {
  if (placeHolder1 === "movie-this") {
    movieThis(placeholder2);
  } else if (placeHolder1 === "spotify-this-song") {
    spotifyThis(placeholder2);
  } else if (placeHolder1 === "concert-this") {
    concertThis(placeholder2);
  }
}
// MOVIES ==================================================

function movieThis(movieName) {
    if (!movieName){
        movieName = "Shrek"
        console.log ("Didn't pick a movie? Well why not choose the best movie ever made?")
      }
  var queryUrl =
    "http://www.omdbapi.com/?t=" +
    movieName +
    "&y=&plot=short&apikey=ba6c2a0f";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);

  axios
    .get(queryUrl)
    .then(function(response) {
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}
// MOVIES ==================================================

// SPOTIFY ==================================================
function spotifyThis(songName) {
  if (!songName){
    songName = "welcome to the black parade"
    console.log("You didn't choose a song? Well my fish Tito died to this song, so thanks for the memories.")
  }
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var songs = data.tracks.items[0]
        console.log(
           "ARTIST: " +
            songs.artists[0].name +
            "\nSONG: " +
            songs.name +
            "\nALBUM: " + 
         songs.album.name +
         "\nPREVIEW: " +
        songs.preview_url) +
        "--------------------------------------------------------------------" 

      });
}
// SPOTIFY ==================================================
// CONCERTS =================================================

function concertThis(concertName) {
    axios.get("https://rest.bandsintown.com/artists/" + concertName + "/events?app_id=codingbootcamp")
    .then(function(response) {    
        for (var i = 0; i < response.data.length; i++) {

            var datetime = response.data[i].datetime; 
            var dateArr = datetime.split('T'); 

            var concertResults = 
                "--------------------------------------------------------------------" +
                    "\nVenue Name: " + response.data[i].venue.name + 
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(dateArr[0], "MM-DD-YYYY");
            console.log(concertResults);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
        

}
//CONCERTS==================================================


checkUserInput(command, mediaInfo);
