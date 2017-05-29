var app = require('express')();
var http = require('http').Server(app);

var port = process.env.PORT || 8080;

http.listen(port, function(){
  console.log('listening on *:' + port);
});

app.get('/', function(req, res){
  console.log('Someone is logged');
  res.sendFile(__dirname + '/index.html');
});

app.get('/test', function(req, res){
  console.log('Someone wants test');
  res.sendFile(__dirname + '/index2.html');
});
