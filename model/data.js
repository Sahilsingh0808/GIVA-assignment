const Sequelize=require("sequelize");
const sequelize=require("./util/database.js").sequelize;
const Data=sequelize.define("data",{
    date:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    state:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    fips:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    cases:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    deaths:{
        type:Sequelize.INTEGER,
        allowNull:false,
    }
});

module.exports=Data;