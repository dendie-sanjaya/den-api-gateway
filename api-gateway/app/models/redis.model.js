const redis = require('redis');
const redisConfig = require("../config/redis.config.js");
const log = require("./log.model.js");

if((redisConfig.USER.length > 0) && (redisConfig.PASSWORD.length > 1)) {
   var connection = 'redis://'+redisConfig.USER+':'+redisConfig.PASSWORD+'@'+redisConfig.HOST+':'+redisConfig.PORT;
} else {
	if(redisConfig.PASSWORD.length > 1) {
   	var connection = 'redis://' + ':' + redisConfig.PASSWORD+'@'+redisConfig.HOST+':'+redisConfig.PORT;
	} else {
	   var connection = 'redis://'+redisConfig.HOST+':'+redisConfig.PORT+'/';		
	}
}	

const redisClient = redis.createClient({
	url: connection
});

redisClient.on('connect', function () {
  	var code = 200;
	var respon_body = {
			"status": "success",
			"code": code,
			"message":"Connection to Redis success",
			"data": ""
	};
	log.ms_api_gateway_connection(respon_body);		
	console.log('Connection to Redis success'); 
});

redisClient.on('error', function () {
	console.log('Connection to Redis Failed'); 
});

redisClient.connect();

exports.new = (token,content) => {
	redisClient.set(token, JSON.stringify(content), redisClient.print);
	redisClient.expire(token, redisConfig.EXPIRED);
};

exports.renewal_expired = (token) => {
	return redisClient.expire(token, redisConfig.EXPIRED);
};

exports.delete = (token) => {
	return redisClient.del(token);
};

exports.info = (token) => {
	return redisClient.get(token);
};

exports.get_all = () => {
	return redisClient.keys('*');
}