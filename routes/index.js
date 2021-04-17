var express = require('express');
var unirest = require("unirest");

var router = express.Router();

/* GET home page. */
router.get('/', function(request, response, next) {
  //res.render('index', { title: 'Express' });
//   var req = unirest("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2");

// req.headers({
// 	"content-type": "application/x-www-form-urlencoded",
// 	"accept-encoding": "application/gzip",
// 	"x-rapidapi-key": "22e1b0bf25msh03a072f396c71e7p130a0fjsnb8356abf2be6",
// 	"x-rapidapi-host": "google-translate1.p.rapidapi.com",
// 	"useQueryString": true
// });

// req.form({
// 	"q": "Hello, world!",
// 	"source": "en",
// 	"target": "ar"
// });


// req.end(function (res) {
// 	if (res.error) throw new Error(res.error);
// response.send(res.body.data.translations[0].translatedText);
// //   console.log(res.body.data.translations[0].translatedText);
// });
response.send("My first req")

});
router.post('/name',function(request, response, next){
	response.send({"msg":"My name " + request.body.cn,
					"source":"post method"
});
	
});
module.exports = router;
