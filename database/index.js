const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
	  	username:String,
	  	repos:Object
	});

	let Repo = mongoose.model('Repo', repoSchema);

	  	let save = (data) => {
	  		console.log(data.username)
	  		console.log("db")
	  		// console.log(data)
	  		let repos = new Repo(data);
	  		
	 	 	repos.save(function(err){
	  			if (err) {
	     			console.log("error", err)
	  	  			return handleError(err)
	    		}
	  			console.log('Saved!')
	 		})
    	}

    	let get=(username,cb)=>{
           Repo.findOne({username:username} , function(err,data){
           	cb(data);
           });

    	}


module.exports.save = save;
module.exports.get=get