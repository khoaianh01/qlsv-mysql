const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const { Sequelize } = require('sequelize');
const methodOverride = require('method-override');
require('dotenv');

const studentRoute = require('./route/student');

const sequelize = new Sequelize('qlsv-3', 'root', null, {
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

app.use('/', studentRoute);


app.listen('3001',(req,res)=>{
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