// Use connect method to connect to the server
var MongoClient = require('mongodb').MongoClient
var utils = require('./utils')

exports.connectToDatabase = function(callback){
  MongoClient.connect(utils.dataBaseUrl, function(err, db) {
  //  assert.equal(null, err);

    if (err){
      callback();
      return;
    }
    console.log("Connected correctly to server");
    callback(db);
    db.close();

  });
}
