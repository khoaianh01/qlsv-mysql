const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const { Sequelize, QueryTypes } = require('sequelize');
const methodOverride = require('method-override');
require('dotenv');
const Op = Sequelize.Op;

const db = require('./models/index');
const Student =require('./models/student');
const Lop = require('./models/lop');
const Subjects = require('./models/subjects');
const Khoa = require('./models/khoa');
const StudentSubject = require('./models/studentSubjects');


const studentRoute = require('./route/student');
const subjectRoute = require('./route/subject');
const khoaRoute = require('./route/khoa');
const sapxepRoute = require('./route/sapxep');
const findRoute = require('./route/find');

const sequelize = new Sequelize('6P4KRNGFaz', '6P4KRNGFaz',"2LemUcMr1X", {
    host: 'remotemysql.com',
    dialect: 'mysql',
    Port: 3306
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


app.use('/', studentRoute);
app.use('/', subjectRoute);
app.use('/',khoaRoute);
app.use('/',sapxepRoute);
app.use('/',findRoute);



// async function main(){
//   let findStudent = await sequelize.query(
    
//     `SELECT Students.lastName,Students.KhoaId,count(KhoaId) as countKhoaId from Students
//     where id in (SELECT StudentId from StudentSubjects
//     where SubjectId = ( 
//     SELECT id from Subjects
//     where nameS='toán'))
//     group by Students.lastName,Students.KhoaId
//     ORDER BY countKhoaId DESC
//     LIMIT 1
//     `,{
//     model:db.studentsubjects,
//     model:db.khoas,
//     include:[{model:db.students},{model:db.subjects}],
//     type: QueryTypes.SELECT
//   })
//   console.log(findStudent)
// }
// main()


app.listen('4000',(req,res)=>{
    console.log('ok')
})
