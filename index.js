const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const TwitterHelper = require("./src/TwitterHelper");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
app.set('view engine', 'ejs');

app.post('/tweets',async (req,res)=>{
  var data = await TwitterHelper.getTweets(req.body.userName,req.body.count);
  var jsnData = {};
  data.forEach(tweet => {
    jsnData[tweet.id_str] =tweet.text;
  });
  return res.status(200).json(jsnData);
});


app.post("/send",async (req,res)=>{
  var message =  req.body.message;
  if(message.length<1){
    return res.status(400).end();
  }
  var resStatus = await TwitterHelper.tweetThread(message);
  return res.status(resStatus).end();
});

app.post("/data",(req,res)=>{
  console.log(req.body);
  return res.status(200).end();
});

const PORT = 4000;

app
  .get("/", function(req, res) {
    res.set({
      "Access-control-Allow-Origin": "*"
    });
    res.render('home'); 
  })
  .listen(PORT);

console.log("server listening at port", PORT);