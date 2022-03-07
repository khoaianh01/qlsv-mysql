// const users = require('../models/user');
const db = require('../models/index');
const User =require('../models/user')
module.exports.getHomePage =  async (req, res, next) => {
    try {
        let data = await db.User.findAll({});
        res.render('homepage.ejs',{data});
    } catch (error) {
        console.log(error)
    }
}
module.exports.getCreateUser = async (req, res, next) => {
    res.render('createuser.ejs')
}
module.exports.createUser = async (req, res, next) => {
    try {
        const {firstName,lastName,email} = req.body;
     
        const user = await db.User.create({firstName:firstName,lastName:lastName,email:email});
        res.redirect('/createuser');
    } catch (error) {
        console.log(error)
    }
}
module.exports.getEditUser = async (req, res, next) => {
    try {
        const iduser = req.params.iduser;
        
        let data = await db.User.findOne({id:iduser});
        console.log(data)
        res.render('edituser.ejs',{data});
    } catch (error) {
        console.log(error)
    }
}
module.exports.editUser = async (req, res, next) => {
    try {
        const iduser = req.params.id;
        const {email} = req.body;
        let data = await db.User.update({email:email},{where : {id:iduser}});
        console.log(data)
        res.redirect('/home')
    } catch (error) {
        console.log(error)
    }
}

module.exports.deleteUser = async (req, res, next) => {
    try {
        const iduser = req.params.id;
        await db.User.destroy({where:{id:iduser}})
        res.redirect('/home')
    } catch (error) {
        console.log(error)
    }
}