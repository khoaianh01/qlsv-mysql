const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const { Sequelize } = require('sequelize');
const methodOverride = require('method-override');
require('dotenv');
const Op = Sequelize.Op;

const db = require('./models/index');
const Student =require('./models/student');
const Lop = require('./models/lop');
const Subjects = require('./models/subjects');
const Khoa = require('./models/khoa');
const StudentSubject = require('./models/studentSubject');


const studentRoute = require('./route/student');
const subjectRoute = require('./route/subject');
const khoaRoute = require('./route/khoa');

const sequelize = new Sequelize('6P4KRNGFaz', '6P4KRNGFaz',"2LemUcMr1X", {
    host: 'localhost',
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


async function sum(){
 // sắp xếp môn học theo bảng chữ cái
  const subjects1= await db.Subjects.findAll({order:[
    'nameS'
  ]});
 


  const khoas = await db.Khoa.findAll({include:[{model: db.Student}]});
  const subjects = await db.Subjects.findAll({include:[{model: db.Student}]});

  const student = await db.Student.findAll({include:[{model: db.Subjects}]});
   //lấy ra môn học có số tc lớn hơn 3 và có nhìu học sinh nhất
   
   const student2 = await db.Subjects.findAll({
 
   sotc:{[Op.gt]:3},
   include:[{model:db.Student}]
   });
   console.log(student2)
  //khóa  có nhiều học sinh nhất
  let maxStudent = 0;
  for(let i =0; i<khoas.length; i++){
    
    let studentLen = khoas[i].Students.length;
    if(maxStudent<studentLen)
    { 
      maxStudent = studentLen;
    }
    
  }
  console.log(maxStudent)
  //học sinh có số tín chỉ nhiều nhất
  //maxtc
  let maxSotc = 0;
  for(let i =0; i<student.length; i++){
   let qty =0;
    for(let j=0;j<student[i].Subjects.length;j++){
     let sotc = student[i].Subjects[j].sotc;
        qty = qty+sotc;
    }
    if(maxSotc<qty)
    maxSotc = qty;
  }
  //hs = maxtc
  for(let i =0; i<student.length; i++){
    let qty =0;
     for(let j=0;j<student[i].Subjects.length;j++){
      let sotc = student[i].Subjects[j].sotc;
         qty = qty+sotc;
     }
     if(qty === maxSotc){
        return i;     
     }
     
   }
// học sinh có tên bât đầu bằng chữ a
const studentA = await db.Student.findAll({where:
  {lastName: {

      [Op.like]: 'a%'
  }}
});
console.log(studentA)
// 
}
sum()
app.listen('3002',(req,res)=>{
    console.log('ok')
})
//123
// exports.addTutorial = (tagId, tutorialId) => {
//   return Tag.findByPk(tagId)
//     .then((tag) => {
//       if (!tag) {
//         console.log("Tag not found!");
//         return null;
//       }
//       return Tutorial.findByPk(tutorialId).then((tutorial) => {
//         if (!tutorial) {
//           console.log("Tutorial not found!");
//           return null;
//         }
//         tag.addTutorial(tutorial);
//         console.log(`>> added Tutorial id=${tutorial.id} to Tag id=${tag.id}`);
//         return tag;
//       });
//     })
//     .catch((err) => {
//       console.log(">> Error while adding Tutorial to Tag: ", err);
//     });
// };