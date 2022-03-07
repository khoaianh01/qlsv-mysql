const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const { Sequelize } = require('sequelize');
const methodOverride = require('method-override')
require('dotenv');

const userRoute = require('./route/user');

const sequelize = new Sequelize('qlsv', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
})
const connect = async () =>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
connect();
const app = express();
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname , 'views'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));

app.use('/', userRoute);
app.listen('3000',(req,res)=>{
    console.log('ok')
})