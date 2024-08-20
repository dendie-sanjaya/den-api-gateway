const mongoConfig = require("../config/mongo.config.js");
const mongo = require('mongodb').MongoClient;	

if((mongoConfig.USER.length > 0) && (mongoConfig.PASSWORD.length > 1)) {
	if((mongoConfig.HOST_REPLICATION.length > 0) && (mongoConfig.PORT_REPLICATION.length > 0)) {
   	  const mongo_replicate_set = 'mongo-replicaset-prod';
   	  var connection = 'mongodb://'+mongoConfig.USER+':'+mongoConfig.PASSWORD+'@'+mongoConfig.HOST+':'+mongoConfig.PORT+','+mongoConfig.HOST_REPLICATION+':'+mongoConfig.PORT_REPLICATION+'/?replicaSet='+mongo_replicate_set+'&connectTimeoutMS=600000';   	
   	  console.log('Connetion MongoDB Replication :');
   } else {
   	  var connection = 'mongodb://'+mongoConfig.USER+':'+mongoConfig.PASSWORD+'@'+mongoConfig.HOST+':'+mongoConfig.PORT+'/';   	
   	  console.log('Connetion MongoDB Single :');
   }		
} else {
   var connection = 'mongodb://'+mongoConfig.HOST+':'+mongoConfig.PORT+'/';
   console.log('Connetion MongoDB :');
}

exports.ms_api_gateway_connection = (log) => {
	mongo.connect(connection, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db(mongoConfig.DB_MS_API_GATEWAY);
	  var myobj = { data_log: log,  created_at: getDateTimeNow() };
	  dbo.collection("log_redis").insertOne(myobj, function(err, res) {
	    if (err) throw err;
	    db.close();
	  });
	}); 
};

async function ms_log_activity_user (username,log_detail)  {
	//await require('util').promisify(setTimeout)(5000);
	//console.log('UNSYNCRO dalam func log activity user')
	return await new Promise((resolve, reject) => { mongo.connect(connection, function(err, db) {
 	  var dbo = db.db(mongoConfig.DB_MS_LOG_ACTIVITY_USER);
	  var myobj = { username: username, detail: log_detail,  created_at: getDateTimeNow() };
	  dbo.collection("log_activity").insertOne(myobj, function(err, res) {
	    if (err) throw err;
	    db.close();
	  });
	})});
};

module.exports.ms_log_activity_user = ms_log_activity_user;

/*
exports.ms_log_activity_user = (username,log_detail) => {
	//require('util').promisify(setTimeout)(5000);
	//console.log('SYCRON dalam func log activity user');
	mongo.connect(connection, function(err, db) {
	  if (err) throw err; 
	  var dbo = db.db(mongoConfig.DB_MS_LOG_ACTIVITY_USER);
	  var myobj = { username: username, detail: log_detail,  created_at: getDateTimeNow() };
	  dbo.collection("log_activity").insertOne(myobj, function(err, res) {
	    if (err) throw err;
	    db.close();
	  });
	}); 
};
*/
function getDateTimeNow() {
  	let date_ob = new Date();
	let date = IntTwoChars(date_ob.getDate());
	let month = IntTwoChars(date_ob.getMonth() + 1);
	let year = date_ob.getFullYear();
	let hours = IntTwoChars(date_ob.getHours());
	let minutes = IntTwoChars(date_ob.getMinutes());
	let seconds = IntTwoChars(date_ob.getSeconds());

  	return (date_ob.getFullYear() + "-" + month + "-" + date  + " " + hours + ":" + minutes + ":" + seconds);
}

function IntTwoChars(i) {
   return (`0${i}`).slice(-2);
}