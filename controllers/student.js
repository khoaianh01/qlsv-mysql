
const db = require('../models/index');
const Student =require('../models/student');
const Lop = require('../models/lop');
const Subjects = require('../models/subjects');
const Khoa = require('../models/khoa');
module.exports.getHomePage =  async (req, res, next) => {
    try {
        let data = await db.Student.findAll({
            include: [
                { model : db.Subjects},
                { model : db.Lop},
                { model  : db.Khoa}
            ]
        });
        console.log(data[2].Subjects)
        // console.log(data)
        res.render('student/homepage.ejs',{data});
    } catch (error) {
        console.log(error)
    }
}
module.exports.getCreateStudent = async (req, res, next) => {
    const subjects = await db.Subjects.findAll({});
    for (let subject of subjects){
        console.log(subject.name)
    }
    res.render('student/createstudent.ejs',{subjects});
}
module.exports.createStudent = async (req, res, next) => {
    try {
        const {name,email} = req.body;
        const nameSubjects = req.body.nameS;
        // console.log('name',req.body.nameS)
        // const data = await db.Student.create({name,email});
        const data1 = await db.Student.findOne({where:{name:'hai'}});
        console.log(data1)
        // const idSubjects =[];
        // for(let i=0; i < nameSubjects.length;i++){
        //     let subject = await db.Subjects.findOne({where :{nameS:nameSubjects[i]}});
        // //   data.addSubjects(subject)
            
        // }

    //    const subjects = await db.Student.findOne({where :{id:1}});
    //   console.log(subjects)
        // console.log(req.body)
        // exports.addTutorial = (,) => {
        //     return Student.findByPk(id)
        //       .then((tag) => {
        //         if (!tag) { 
        //           console.log("Tag not found!");
        //           return null;
        //         }
        //         return Tutorial.findByPk(tutorialId).then((tutorial) => {
        //           if (!tutorial) {
        //             console.log("Tutorial not found!");
        //             return null;
        //           }
        //           tag.addTutorial(tutorial);
        //           console.log(`>> added Tutorial id=${tutorial.id} to Tag id=${tag.id}`);
        //           return tag;
        //         });
        //       })
        //       .catch((err) => {
        //         console.log(">> Error while adding Tutorial to Tag: ", err);
        //       });
        //   };
     
 
        res.redirect('/createstudent');
    } catch (error) {
        console.log(error)
    }
}
// module.exports.getEditStudent = async (req, res, next) => {
//     try {
//         const studentId = req.params.studentId;
        
//         let data = await db.Student.findOne({id:studentId});
//         console.log(data)
//         res.render('editstudent.ejs',{data});
//     } catch (error) {
//         console.log(error)
//     }
// }
// module.exports.editStudent = async (req, res, next) => {
//     try {
//         const studentId = req.params.id;
//         const {email} = req.body;
//         let data = await db.Student.update({email:email},{where : {id:studentId}});
//         console.log(data)
//         res.redirect('/home')
//     } catch (error) {
//         console.log(error)
//     }
// }

// module.exports.deleteStudent = async (req, res, next) => {
//     try {
//         const studentId = req.params.id;
//         await db.Student.destroy({where:{id:studentId}})
//         res.redirect('/home')
//     } catch (error) {
//         console.log(error)
//     }
// }
