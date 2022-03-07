const express = require('express');
const user_router = express.Router();
const homepage = require('../controllers/user');

user_router.get('/home',homepage.getHomePage);
user_router
   .route('/createuser')
   .get(homepage.getCreateUser)
   .post(homepage.createUser);
user_router
   .route('/edituser/:id')
   .get(homepage.getEditUser)
   .put(homepage.editUser);
user_router
   .route('/deleteuser/:id')
   .delete(homepage.deleteUser);

module.exports = user_router;