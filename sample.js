
var MongoClient = require('mongodb').MongoClient,format =require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017',useNewUrlParser: true,function(err,db){

  if(err){

} else{
  console.log("Connected");
}
db.close();

});
