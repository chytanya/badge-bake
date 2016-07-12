//Lets require/import the HTTP module
var http  = require('http');
var fs    = require('fs');
var bakery = require('openbadges-bakery');
var connect = require('connect');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var publicDir = __dirname + '/public/';

//Lets define a port we want to listen to
const PORT=8080;

var app = connect();
app.use(bodyParser.urlencoded());

app.use(serveStatic(__dirname + '/public'))

app.use('/', function(req, res, next){
  //prepare the assertion and image
  var img=fs.readFileSync(publicDir + 'images/badge.png');
  var theAssertion = JSON.parse(fs.readFileSync(publicDir + 'data/assertion.json', 'utf8'));
  var options = {
      image: img,
      assertion: theAssertion,
  };
  //bake assertion into image
  bakery.bake(options, function(err, data){
      //give the baked badge a file name
      var fileName = 'baked.png';
      var imagePath = publicDir + 'images/' + fileName;//"baked" directory
      //write the returned baked badge data to file
      fs.writeFile(imagePath, data, function (err) {
          // if(err) res.write(err);
          //  else res.write("<img src='"+imagePath+"' alt='badge'/>");
          console.log('writing image done!!', err);
      });
  });

});


//Create a server
var server = http.createServer(app);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

//http://node-machine.org/machinepack-openbadges/bake-assertion
