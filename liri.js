//captures the user input on the command line
var input = process.argv[2];
var keys = require('./keys.js');
var twitter = require('twitter');
var parameters = {screen_name: 'camcfarlin', count: 20};
var client = new twitter(keys.twitterKeys);

//variables for spotify
var spotify = require('spotify');
var song = '';

//variable for OMBD
var request = require('request');
var movie = '';

//variable for fs
var fs = require('fs');

//TWITTER
if(input == 'my-tweets'){
	console.log('');
	console.log('-----------------------------------------------------------------------');
	client.get('statuses/user_timeline', parameters, function(err, tweets, response){
		if(!err){
			for(i=19;i>=0;i--)
			console.log('Tweet #' + (20 - i) + ': ' + tweets[i].text);
		}
	})
}
//SPOTIFY
else if(input =='spotify-this-song'){
	for(i=3;i<process.argv.length;i++){
		var song = song + '+' + process.argv[i];
	}
	if(song == ''){
		var song = 'whats+my+age+again';
	}

	spotify.search({type: 'track', query: song}, function(err,data){
		if(!err){
			console.log('--------------------------------------------------------------');
			console.log('');
			console.log('Artist: ' + data.tracks.items[0].artists[0].name);
			console.log('Album Name: ' + data.tracks.items[0].album.name);
			console.log('Song Name: ' + data.tracks.items[0].name);
			console.log('Preview Link: ' + data.tracks.items[0].preview_url);
			console.log('');
			console.log('---------------------------------------------------------------');
		}
	})
}
//OMDB
// var movie;
// if (movie === '') {
//   movie = 'Mr. Nobody';
// } else {
//   movie = movie;
// }
else if(input == 'movie-this'){

	for(i=3;i<process.argv.length;i++){
    
		var movie = movie + '+' + process.argv[i];
	}

	request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&r=json', function (error, response, body) {

		if (!error && response.statusCode == 200) {
			console.log('');
			console.log('----------------------------------------------------------------');
			console.log('Title: ' + JSON.parse(body)['Title']);
			console.log('IMDB Rating: ' + JSON.parse(body)['imdbRating']);
			console.log('');
			console.log('Plot: ' + JSON.parse(body)['Plot']);
			console.log('');
			console.log('Actors: ' + JSON.parse(body)['Actors']);
			console.log('');
			console.log('Year: ' + JSON.parse(body)['Year']);
			console.log('Runtime: ' + JSON.parse(body)['Runtime']);
			console.log('Rated: ' + JSON.parse(body)['Rated']);
			console.log('');
			console.log('----------------------------------------------------------------');
		}
	});
}
//DO WHAT IT SAYS
else if(input == 'do-what-it-says'){
	fs.readFile('random.txt', 'utf8', function(error, data){
		var randomArray = data.split(' ');
		var command = randomArray[0];
		var media = '';

		for(i=1;i<randomArray.length;i++){
		media = media + '+' + randomArray[i];
		};
		if(command == 'my-tweets'){
			console.log('');
			console.log('-----------------------------------------------------------------------');
			client.get('statuses/user_timeline', parameters, function(err, tweets, response){
				if(!err){
					for(i=19;i>=0;i--)
					console.log('Tweet #' + (20 - i) + ': ' + tweets[i].text);
				}
			})
		}
		else if(command =='spotify-this-song'){
			var song = media;
			
			if(song == '+'){
				var song = 'whats+my+age+again';
			}

			spotify.search({type: 'track', query: song}, function(err,data){
				if(!err){
					console.log('--------------------------------------------------------------');
					console.log('');
					console.log('Artist: ' + data.tracks.items[0].artists[0].name);
					console.log('Album Name: ' + data.tracks.items[0].album.name);
					console.log('Song Name: ' + data.tracks.items[0].name);
					console.log('Preview Link: ' + data.tracks.items[0].preview_url);
					console.log('');
					console.log('---------------------------------------------------------------');
				}
			})
		}
		else if(command == 'movie-this'){
			var movie = media;

			request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&r=json', function (error, response, body) {

				if (!error && response.statusCode == 200) {
					console.log('');
					console.log('----------------------------------------------------------------');
					console.log('Title: ' + JSON.parse(body)['Title']);
					console.log('IMDB Rating: ' + JSON.parse(body)['imdbRating']);
					console.log('');
					console.log('Plot: ' + JSON.parse(body)['Plot']);
					console.log('');
					console.log('Actors: ' + JSON.parse(body)['Actors']);
					console.log('');
					console.log('Year: ' + JSON.parse(body)['Year']);
					console.log('Runtime: ' + JSON.parse(body)['Runtime']);
					console.log('Rated: ' + JSON.parse(body)['Rated']);
					console.log('');
					console.log('----------------------------------------------------------------');
				}
			});
		}	
	})
};


