var app = require('express')();
var http = require('http').Server(app);
var database = require('./database');
var bodyParser = require("body-parser");

var port = process.env.PORT || 80;

http.listen(port, function(){
  console.log('listening on *:' + port);
});

app.use(bodyParser.urlencoded({ extended: true })); //Accept Url encoded params
app.use(bodyParser.json())

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

  database.connectToDatabase(function(db){

  var collection = db.collection('items');
    collection.insertOne({
      title:req.body.title,
      done:false,
    });
  });

  res.write("new Item added");
});

//MARK: Add an item
app.post('/checkitem', function(req, res){

  database.connectToDatabase(function(db){

  var collection = db.collection('items');
  collection.findOneAndUpdate({ title: req.body.title},{ $set: { done: true}}, function(err, itemFound) {

    if (itemFound){
          res.send();
      }
  });
});
});

//MARK: get items
app.get('/jeanpierre', function(req, res){

  database.connectToDatabase(function(db){

  var collection = db.collection('items');
  var cursor = collection.find()

  var response = ""
  cursor.each(function(err, item) {
      // If the item is null then the cursor is exhausted/empty and closed
      if(item == null) {
          db.close(); // you may not want to close the DB if you have more code....
            res.send(response);
          return;
      }
      if (item.done){
        response = response + "<li class=\"checked\">" + item.title +  "</li>\n"
        }else{
        response = response + "<li>" + item.title +  "</li>\n"
      }
// otherwise, do something with the item
  });
  });
});
