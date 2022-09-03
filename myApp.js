let express = require('express');
let bodyParser= require('body-parser');
let app = express();


app.use(function middleware(req, res, next) {
  console.log(req.method  + " " +  req.path + " - " + req.ip);
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/json", (req, res) => {
  if(process.env.MESSAGE_STYLE==="uppercase"){
    res.json({"message": "HELLO JSON"});
  }
  else
  {res.json({"message": "Hello json"});}
});

app.get("/",function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/now", function(req, res, next) {
  req.time = new Date().toString();  // Hypothetical synchronous operation
  next();
}, function(req, res) {
  res.send({"time": req.time});
});

app.get("/:word/echo",(req, res) => {
  var word = req.params.word;
  res.send({echo: word});
});

app.get("/name",function(req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  res.send({name: `${firstName} ${lastName}`})
});
app.post("/name",function(req, res) {
  name = req.body.first + " " + req.body.last;
  res.send({name: name})
});

app.use("/public", express.static(__dirname + "/public"));





































 module.exports = app;
