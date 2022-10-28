
const User = require('../models/User');
const { SHA256, enc } = require('crypto-js');
const jwt = require('jsonwebtoken');

class UsersController {
  static async register(req, res, next) {
    const {email, password} = req.body;
    try{
        const register = await User.addUser(email, SHA256(password).toString(enc.SHA256));
        if(register.succeed == true){
            const jwtToken = jwt.sign({"email": email}, process.env.SECRET_KEY)
            res.status(200).json({
                "token": jwtToken
            });
        }else{
            res.send("daftar gagal")
        }
    }catch(err){
        console.log(err)
        next(err) //internal server error
    }
  }

  static async login(req, res, next){
    const {email, password} = req.body;
    const input_pw = SHA256(password).toString(enc.SHA256)
    try{
        const userLogin = await User.getUser(email);
        if(userLogin){
            const db_pw = userLogin.password;
            if(input_pw == db_pw){
                const jwtToken = jwt.sign({"email": email}, process.env.SECRET_KEY)
                res.status(200).json({
                    "token": jwtToken
                });
            }else{
                next({name: "WrongPassword"})
                // res.status(200).json({"messages": "Password Wrong!"})
            }
        }else{
            next({name: "EmailNotFound"})
            // res.status(200).json({"messages": "Email not registered!"})
            
        }
        
    }catch(err){
        next({})
    }
  }
}

module.exports = UsersController;
