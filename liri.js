// Read and set environment variables
require("dotenv").config();

// prints `SZzsigw3iqE0pSADB` to the console
console.log(process.env.TWITTER_CONSUMER_KEY) 

// prints `AMw4tYFP7an0lIul49C21aS9fk2cWZTGS8XVE` to the console
console.log(process.env.TWITTER_CONSUMER_SECRET)
// etc.

//Grab data from keys.js
var keys = require('./keys.js');
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');
var client = new twitter(keys.twitterKeys);
var fs = require('fs');

//Stored argument's array
var nodeArgv = process.argv;
var command = process.argv[2];
