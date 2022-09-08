var config=require('./dbconfig');
const sql=require('mssql');
const redis = require("redis");



async function getStates(state){
    let isCached = false;
    try{
        const cacheResults = await redisClient.get(state);
        let pool=await sql.connect(config);
        let states=await pool.request().input('input_parameter',sql.Int,state).query("SELECT * from states where state= @input_parameter");
        if (states.length === 0) {
            throw "API returned an empty list";
          }
        return states.recordsets;
    }
    catch{
        console.log("error");
    }
}

module.exports={
    getStates:getStates
}