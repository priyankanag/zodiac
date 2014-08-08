var express = require("express"),
	http = require("http"),
	https = require("https"),
	app = express(),
	db = require("./lib/mysql.js"),
	getZodiacFromDate = require("./lib/zodiacFromDate.js"),
	request = require("request"),
	config = require('./config.js'),
	server;
	

app.use(express.query());
app.use(express.bodyParser());

server = http.createServer(app);
server.listen(8000);



function sendPushNotifications() {
	var message={registration_ids: [config.pushNotifications.deviceId],data:{message: "hi"}};
	console.log("senging");
	var options = {
		url: 'https://android.googleapis.com/gcm/send',
		headers:{
			"Content-Type" : "application/json",
			"Authorization" : config.pushNotifications.key
		},
		body: JSON.stringify(message)
	}
	request.post(
		options,
		function (error, response, body) {
			if(error) console.log(error);
			console.log(body|| "");
			if (!error && response.statusCode == 200) {
				console.log(body)
			}
		}
	);
}
sendPushNotifications();
app.get("/predictions", function (req, res, next) {
	
	db.query("select * from users where;", function (err, results) {	
		if (err) {
			res.end("{error: '" + err.message + "'}");
		} else {
			res.end("{data: '" + "something" + "'}");
		}
	});
});


app.post("/test", function (req, res, next) {
	console.log("++++++++/test",req.headers.authorization, req.body.a, typeof req.body);
	res.end("{state:true}");
	
});

app.post("/feedback", function (req, res, next) {
	db.query("INSERT INTO `submissions`(`sdate`,`deviceid`, `predictionid`, `response`) values(?,?,?,?) ON DUPLICATE KEY UPDATE " +
	"`sdate`=values(`sdate`),`deviceid`=values(`deviceid`),`predictionid`=values(`predictionid`), `response`=values(`response`)", 
		 [req.body.sdate, req.body.deviceid, req.body.predictionid, req.body.response],
	function (err, resp) {
		if (err) {
			console.log(err);
			res.end("{state:false}");
		} else res.end("{state:true}");
	});
});

app.post("/user", function (req, res, next) {
	var zodiac = getZodiacFromDate(req.body.dob);
	db.query("INSERT INTO `users`(`deviceid`, `dob`, `zodiac`, `timezone`) values(?,?,?,?) ON DUPLICATE KEY UPDATE " +
		"`deviceid`=values(`deviceid`),`dob`=values(`dob`),`zodiac`=values(`zodiac`), `timezone`=values(`timezone`)", 
			 [req.body.deviceid, req.body.dob, zodiac, req.body.timezone],
		function (err, resp) {
			if (err) {
				console.log(err);
				res.end("{state:false}");
			} else res.end("{state:true}");
		});
});