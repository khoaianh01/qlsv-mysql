const express = require('express');
const student_router = express.Router();
const homepage = require('../controllers/student');
student_router.get('/home',homepage.getHomePage);
student_router
   .route('/createstudent')
   .get(homepage.getCreateStudent)
   .post(homepage.createStudent);
//    student_router
//    .route('/edistudent/:id')
//    .get(homepage.getEditUser)
//    .put(homepage.editUser);
//    student_router
//    .route('/deletstudent/:id')
//    .delete(homepage.deleteUser);
module.exports = student_router;
