const request = require('request');
const config = require('../config.js');
const mongo = require('../database/index.js');
let getReposByUsername = (username,callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL

  // configer the option the conatin the headers and url  => request info
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  };
  // use request module to dmake the request to api and get the repos
  request.get(options, function(err, res, body) {
     if (err) {
      console.log(err);
     }
     console.log("helper")
     // config object contain the username and the repos 
     var userRepo = {username: username, repos: JSON.parse(body)};
     // pass the object to callback function
     callback(userRepo)
     
  });

}

module.exports.getReposByUsername = getReposByUsername;