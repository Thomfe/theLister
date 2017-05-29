var app = require('express')();
var http = require('http').Server(app);
var database = require('./database');

var port = process.env.PORT || 80;

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

//MARK: Add an item
app.post('/addItem', function(req, res){

  var collection = db.collection('items');

  database.connectToDatabase(function(db){

    collection.insertOne({
      title:req.body.title,
      description: req.body.description,
      done:false,
      function(err, result) {
        if (err){
          console.log("Error adding item",err);
          return res.json({success: false});
        }else{
          console.log("New item !");
          return res.json({success: true});
        }
      }
    });
  });
});
