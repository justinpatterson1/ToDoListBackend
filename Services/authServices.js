const AuthModel = require("../Model/AuthModel")
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');

exports.GetAllAccounts = (req,res) =>{
    AuthModel.find()
        .then((auth)=>{
            res.json({
                message:'All accounts have been returned',
                data: auth,
                length:auth.length
            })
        })
        .catch(err =>{
            res.status(404).json({
                message:"Error occured while returning all accounts",
                error:err
            })
        })
}


exports.GetAnAccount = (req,res) =>{
    AuthModel.findById(req.params.id)
    .then((auth)=>{
        res.json({
            message:`Account id:${req.params.id} have been returned`,
            data: auth,
            
        })
    })
    .catch(err =>{
        res.status(404).json({
            message:"Error occured while returning an account",
            error:err
        })
    })
}

exports.DeleteAnAccount = (req,res) =>{
    AuthModel.findByIdAndDelete({_id:req.params.id})
    .then((auth)=>{
        res.json({
            message:`ID : ${req.params.id} has been deleted`,
            data: auth,
         
        })
    })
    .catch(err =>{
        res.status(404).json({
            message:"Error occured while returning an account",
            error:err
        })
    })
}




exports.CreateAnAccount = (req,res) => {
    const newUser = AuthModel(req.body)
    bcrypt.genSalt(10)
        .then(salt =>{
            bcrypt.hash(newUser.password,salt)
                .then(hash=>{
                    newUser.password = hash;

                    newUser.save()
                        .then(user =>{
                            res.json({
                                message:"New account has been added",
                                data: user
                            })
                        })
                        .catch(err=>{
                            res.status(404).json({
                                message:'Error creating new user',
                                data:err
                            })
                        })
                })
                .catch(err=>{
                    res.status(404).json({
                        error:err
                    })
                })
        })
        .catch(err=>{
            res.status(404).json({
                error:err
            })
        })
}



exports.Login = (req,res) => {
    AuthModel.findOne()
        .where ("email").equals(req.body.email)
        .then(user=>{

            bcrypt.compare(req.body.password,user.password)
                .then(authorisedUser=>{

                    if(authorisedUser){

                        const token = jwt.sign({
                            _id:user._id,
                            firstName:user.firstName,
                            lastName:user.lastName,
                            email:user.email
                        },process.env.SECRET)

                        res.header('x-auth-header',token).json({
                            message:"Authentication Successful",
                            data:token
                        })
                    }
                    else{
                        res.status(400).json({
                            message:'Incorrect Email/Password'
                        })
                    }
                })

        })
        .catch(err => {
            res.status(404).json({
                message:"Invalid credentials",
                error:err
            })
           
        })
}