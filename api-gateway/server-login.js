const express = require("express");
const bodyParser = require("body-parser");
const url = require('url');
const uuid = require('uuid');
const server = require("./app/config/server.config.js");
const mappingMS = require("./app/config/mapping-ms.config.js");
const redis = require("./app/models/redis.model.js");
const app = express();
const request = require('request');
const global_func = require('./lib/global_func.js');
const redisConfig = require("./app/config/redis.config.js");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin-user', function (req, res, next) {
		//lakukan check login ke microservrice kyc table user pengguna
		let generate_token = 'user-'+req.body.username+'-'+uuid.v4();
		let code = 200;
		let data = {username: req.body.email};	
		let is_cms_value = 0;

		if(req.body.is_cms) {
		  is_cms_value = req.body.is_cms;
		}

		request.post({
		  url:     mappingMS['ms-auth'] + '/ms-auth/login',
		  form:    { email: req.body.username, password: req.body.password }
		}, function(error, response, body){
			try {
				respon_kyc = JSON.parse(response.body);
			    if((respon_kyc.code == 200) && (respon_kyc.status.toLowerCase() == 'success')) {
					redis.new(generate_token,respon_kyc.data);

					var respon_body = {
							"status": "success",
							"code": respon_kyc.code,
							"message": 'Login Success - Get Token',
							"data": respon_kyc.data,
							"token": generate_token
					};

					res.status(code).send(respon_body);	
			    } else {
					var respon_body = {
							"status": "failed",
							"code": respon_kyc.code,
							"message": respon_kyc.message,
							"data": respon_kyc.data,
							"token": ""
					};
					res.status(code).send(respon_body);		    	
			    }
			}    
  			catch (e) { 
				var respon_body = {
						"status": "failed",
						"code": "503",
						"message": "Busy Server - Please Try Again",
						"data": "",
						"token": ""
				};
				res.status(code).send(respon_body);		  				
  			}			        					
		});		
});


app.get('/signout', function (req, res, next) {
		let code = 200;
		let data = {token: req.query.token};	
		redis.delete(req.query.token);

		var respon_body = {
				"status": "success",
				"code":code,
				"message": 'Signout Success',
				"data": data,
		};
		res.status(code).send(respon_body);					
});

app.get('/info', function (req, res, next) {
	let info  = redis.info(req.query.token);
	info.then(function(result) {
		if(result) {
			let code = 200;
			var respon_body = {
					"status": "success",
					"code":code,
					"message": 'Info Token',
					"data": JSON.parse(result),
			};
			res.status(code).send(respon_body);					
		} else {
			let code = 400;
			var respon_body = {
					"status": "failed",
					"code":code,
					"message": 'Token Not Found',
					"data": ''
			};
			res.status(code).send(respon_body);									
		}	
	});
});

app.get("/", (req, res) => {
  res.json({ message: "Server Microservice Api Gateway Login is listening on port " + server.HOST + ':' + server.PORT_LOGIN });
});

app.listen(server.PORT_LOGIN, function(){
    console.log("Server Microservice Api Gateway Login is listening on port " + server.HOST + ':' + server.PORT_LOGIN);
});



