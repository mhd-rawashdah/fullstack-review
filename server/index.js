const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('../database/index.js');
const helpers = require('../helpers/github.js');
let app = express();
// use body parser
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

// this to deal with post request from the client
app.post('/repos', function (req, res) {
	console.log("server post")
  // username that come from the client
  var username = req.body.username;
  //get the repos from mongo database by pass the usename 
  mongo.get(username, function(data){
  	// if repos's name  exist in the Db return it
  	if (data){
  		res.send(data.repos);
  	} else {
  		// get the repos from the github api by using getReposByUsername() function that exist in the helpers folder
	  	helpers.getReposByUsername(username, function(userRepos){
	  		console.log("get the Repos from the API" , userRepos)
				if (userRepos.repos.length > 0) {
				   // save the repos to mongo db
				   console.log(userRepos);
				   mongo.save(userRepos);
				   // send response to client if exist with the data
		           res.send(userRepos.repos); 
				} else {
					 // if the username not exist in the gitHub
		   		  res.send('This username has no repo');
				}
	  	});
	  
	}
  });

});


// this to deal with get request from the client   
app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  console.log(req.body);
	mongo.get(req.body.username,function(data){
		console.log("mongo data " + data);
		res.send(data)
	})
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

