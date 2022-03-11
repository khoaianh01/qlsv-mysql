const db = require('../models/index');
const Student =require('../models/student');
const Lop = require('../models/lop');
const Subjects = require('../models/subjects');
const Khoa = require('../models/khoa');
const StudentSubject = require('../models/studentSubject');

module.exports.sumKhoaStudent = async(req,res) =>{

   const khoas = await db.Khoa.findAll({})
   console.log(khoas)

}