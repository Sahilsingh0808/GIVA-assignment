const Sequelize = require('sequelize')
// const sequelize = require("/util/database")

const config={
    user:'foo',
    password:'foo',
    server:'127.0.0.1',
    database:'usstates',
    options:{
        trustedconnection: true,
        enableArithAort: true,
        instancename: 'SQLEXPRESS'
    },
    port: 55892
}

module.exports=config;