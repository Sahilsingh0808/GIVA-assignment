const { application, response } = require('express');
const dbOperations = require('./dbOperations');
var Db=require('./dbOperations');
var states=require('./states');
var express=require('express');
var bodyParser=require('express');
var cors=require('cors');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var app=express();
var router=express.Router();
const axios = require("axios");
const redis = require("redis");
const { getStates } = require('./dbOperations');
const sequelize = require('sequelize');
const Data = require('./model/data');
let results;
let isCached = false;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api',router);



router.use((request,response,next)=>{
    console.log('middleware');
    next();
})

router.route("/states/:state").get((request,response)=>{
    dbOperations.getStates(request.params.state).then(result=>{
        response.json(result[0]);
    })
})

var port=process.env.PORT||8090;
app.listen(port);
console.log('States API is running at '+port);


let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();


async function getSpeciesData(req, res) {
    const species = req.params.species;
    let results;
    let isCached = false;
  
    try {
      const cacheResults = await redisClient.get(species);
      if (cacheResults) {
        isCached = true;
        results = JSON.parse(cacheResults);
      } else {
        results = await fetchApiData(species);
        if (results.length === 0) {
          throw "API returned an empty array";
       }
      }
  
      res.send({
        fromCache: isCached,
        data: results,
      });
    } catch (error) {
      console.log(error);
    }
  }

dbOperations.getStates().then(result=>{
    console.log(result);
})