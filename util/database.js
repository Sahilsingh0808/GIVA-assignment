const Sequelize =require("sequelize");
const sequelize=new Sequelize("states","root","password",{
    dialect:"mysql",
    host:"localhost",
});

module.exports=sequelize;