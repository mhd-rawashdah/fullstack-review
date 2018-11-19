const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('../database/index.js');
const helpers = require('../helpers/github.js');
let app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
	console.log("server post")
   // TODO - your code here!
   // This route should take the github username provided
   // and get the repo information from the github API, then
   // save the repo information in the database
  var username = req.body.username;

  mongo.get(username, function(data){
  	if (data){
  		res.sendStatus(201)
  	}
  	else{
	  	helpers.getReposByUsername(username, function(userRepos){
	  		console.log("server to db")
			if (userRepos.repos.length > 0) {
				mongo.save(userRepos);
	        	res.send(userRepos); 
			} else {
			res.send('This username has no repo')
			}
	  	});
	  
		}
  })

});


 
app.get('/repos', function (req, res) {
    // TODO - your code here!
    // This route should send back the top 25 repos
	mongo.get(req.body.username,function(data){
		console.log("mongo data " + data);
		res.send(req.body.username)
	})
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

