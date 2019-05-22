const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/User")
const User1 = require("../models/User1")

users.use(cors())
process.env.SECRET_KEY = 'secret'
//REGISTER
users.post('/client_register',(req,res) => {
    const today = new Date()
    const userData = {
        company_name : req.body.company_name,
        contact_name : req.body.contact_name,
        contact_Telephone : req.body.contact_Telephone,
        contact_Mobile : req.body.contact_Mobile,
        contact_Role : req.body.contact_Role,
        companyTotalEmployees : req.body.companyTotalEmployees,
        companyITEmployees : req.body.companyITEmployees,
        email : req.body.email,
        password : req.body.password,
        created : today
        
    }
    
    User1.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user1 =>{
            if(!user1){
                const hash = bcrypt.hashSync(userData.password, 10)
                userData.password = hash
                User1.create(userData)
                .then(user => {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.json({token: token})
                })
                .catch(err => {
                    res.send('error: ' +err)
                })
            }else{
                res.json({ error: 'User already exists' })
            }
        })
          .catch(err => {
              res.send('error: ' +err)
          })
})



//REGISTER
users.post('/register',(req,res) => {
    const today = new Date()
    const userData = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        password : req.body.password,
        created : today
    }

    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user =>{
            if(!user){
                const hash = bcrypt.hashSync(userData.password, 10)
                userData.password = hash
                User.create(userData)
                .then(user => {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.json({token: token})
                })
                .catch(err => {
                    res.send('error: ' +err)
                })
            }else{
                res.json({ error: 'User already exists' })
            }
        })
          .catch(err => {
              res.send('error: ' +err)
          })
})

//LOGIN
users.post('/login', (req,res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
            })
            res.json({token: token})
        }else{
            res.send('User does not exist')
        }
    })
    .catch(err => {
        res.send('error: ' +err)
    })
})

//PROFILE
users.get('/profile', (req,res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    user.findOne({
        where: {
            id:decoded.id
        }
    })
    .then(user => {
        if(user) {
            res.json(user)
        }else{
            res.send('User does not exist')
        }
    })
    .catch(err => {
        res.send('error: ' +err)
    })
})
module.exports = users