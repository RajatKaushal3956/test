var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var {MongoClient} = require('mongodb');
let db;

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/TodoApp", function(err, database) {
  if(err) return console.error(err);

  db = database.db('TodoApp');

  // the Mongo driver recommends starting the server here because most apps *should* fail to start if they have no DB.  If yours is the exception, move the server startup elsewhere. 
});

app.use(bodyParser.json());
// Reuse database object in request handlers
app.get("/show", async function(req, res,) {
  let data = await db.collection('todos').find().toArray();
  return res.send(data);
});

app.post("/insert",async (req,res)=>{
  let data = req.body;
  try{
    await db.collection('todos').insertOne(data);
    return res.status(201).send();
  }
  catch(err){
    return res.status(404).send();
  }

});


// Starting the app here will work, but some users will get errors if the db connection process is slow.  
  app.listen(3000);
  console.log("Listening on port 3000");
