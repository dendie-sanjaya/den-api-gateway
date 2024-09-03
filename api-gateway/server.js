const express = require("express");
const bodyParser = require("body-parser");
const url = require('url');
const uuid = require('uuid');
const server = require("./app/config/server.config.js");
const mappingMS = require("./app/config/mapping-ms.config.js");
const redis = require("./app/models/redis.model.js");
const app = express();
const log = require("./app/models/log.model.js");
const request = require('request');
const global_func = require('./lib/global_func.js');
const redisConfig = require("./app/config/redis.config.js");
const urlNoAuthorize = require("./app/config/url-no-authorize.js");

var proxy = require('http-proxy').createProxyServer({
    host: server.HOST +':' + server.PORT,
});



proxy.on('proxyReq', function(proxyReq, req, res, options) {
	const path = url.parse(req.url).path;
	const path_arr = path.split("/");	
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];	
	let data_req_post = '';

	req.on('data', function (chunk) {
		data_req_post += chunk.toString();
	});		

	req.on('end', () => {
		var body_log_activity = {
				"token": token,
				"user_detail":info_user,
				"type":"request-data",
				"url":url.parse(req.url).path,
				"data_request_type": req.headers['content-type'],
				"data_request":data_req_post,
		};
		//console.log('REQ: SEBELUM LOG');  
		//log.ms_log_activity_user(info_user.email,body_log_activity);
		//console.log('REQ: SETELAH LOG');  
		//console.log(body_log_activity);  
	});
});

proxy.on('proxyRes', function (proxyRes, req, res_proxy) {
	const path = url.parse(req.url).path;
	const path_arr = path.split("/");	
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];	

    var data_respon = [];

    proxyRes.on('data', function (chunk) {
        data_respon.push(chunk);
    });

    proxyRes.on('end', function () {
        data_respon = Buffer.concat(data_respon).toString();

		var body_log_activity = {
				"token": token,
				"user_detail":info_user,
				"type":"respon-data",
				"url":url.parse(req.url).path,
				"data_request_type": req.headers['content-type'],
				"data_respon":data_respon
		};
		//console.log('RESPON: SEBELUM LOG');  
		//log.ms_log_activity_user(info_user.email,body_log_activity);
		//console.log('RESPON: SEBELUM LOG');  
		//console.log(body_log_activity); 
		res_proxy.end(); 
    });
},)


app.use((req, res, next) => {
	const path = url.parse(req.url).path;
	const path_arr = path.split("/");	
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];	

	if(urlNoAuthorize.indexOf(path) >= 0) {
		if(mappingMS[path_arr[1]]) {
			if (token == null) {
				const data_no_authorization = JSON.stringify({user_id: "no.authorization"});
			  	info_user = JSON.parse(data_no_authorization);
			    proxy.web(req, res, {
			        target:  mappingMS[path_arr[1]],
			    }, next )

			} else {
				token_check = redis.info(token);
				token_check.then(function(result) {
					if(result) {
						info_user = JSON.parse(result);
						redis.renewal_expired(token);						  	 
					    proxy.web(req, res, {
					        target:  mappingMS[path_arr[1]],
					    }, next )
					} else {
						var code = 401;
						var respon_body = {
								"status": "error",
								"code":code,
								"message": 'Unathorization Access',
								"data":""
						};
						res.status(code).send(respon_body);					
					}
				});					
			}  	
		} else {
			var code = 500;
			var respon_body = {
					"status": "error",
					"code":code,
					"message": 'Microservice Not Found',
					"data":""
			};
			res.status(code).send(respon_body);		
		}  					
	} else {
	  	if (token == null)  {
			var code = 401;
			var respon_body = {
					"status": "error",
					"code":code,
					"message": 'Token Not Found',
					"data":""
			};
			res.status(code).send(respon_body);		
	  	} else {	
	  		const token_check  = redis.info(token);
			token_check.then(function(result) {
				if(result) {
					info_user = JSON.parse(result);
					redis.renewal_expired(token);

					if(mappingMS[path_arr[1]]) {
					  	 
					    proxy.web(req, res, {
					        target:  mappingMS[path_arr[1]],
					    }, next )

					} else {
						var code = 500;
						var respon_body = {
								"status": "error",
								"code":code,
								"message": 'Microservice Not Found',
								"data":""
						};
						res.status(code).send(respon_body);		
					}  
				} else {
					var code = 401;
					var respon_body = {
							"status": "error",
							"code":code,
							"message": 'Unathorization Access',
							"data":""
					};
					res.status(code).send(respon_body);					
				}
			});	
		}	
	}
});

app.get("/", (req, res) => {
  res.json({ message: "Server Microservice Api Gateway is listening on port " + server.HOST + ':' + server.PORT });
});

app.listen(server.PORT, function(){
    console.log("Server Microservice Api Gateway is listening on port " + server.HOST + ':' + server.PORT);
});
