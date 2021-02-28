const express = require("express");


const session = require('express-session')
const bcrypt = require("bcrypt");

const User = require('../models/user');

module.exports.loginGet = (req,res) => {
};

module.exports.loginPost = (req,res) => {
    User.find({nick: req.body.nick},(err,results) => {
        if(err){
            console.log("findda sorunlar var");
        }else{

            if(results.length == 0){
                res.render('homePage',{loginErr:"I don't know you!",signSuccess:'',signErr:'',layout:false});
            }else{
                if(bcrypt.compareSync(req.body.password,results[0].password)){
                    req.session.authenticatedUser = results[0];

                    res.redirect('/');
                }else{
                    res.render('homePage',{loginErr:"Wrong password!",signSuccess:'',signErr:'',layout:false});
                }
            }
            
        }
        
    });
    
};

module.exports.signUpGet = (req,res) => {
};

module.exports.signUpPost = (req,res) => {
    
    if(req.body.passwordAgain != req.body.password){
        res.render('homePage',{loginErr:'', signSuccess:'',signErr:'Passwords are not equal!',layout:false});
    }

    //  Hashing password
        var hashedPassword = bcrypt.hashSync(req.body.password,12);
    

    var newUser = new User({
        name: req.body.name,
        nick: req.body.nick,
        email: req.body.mail,
        password: hashedPassword,

        bio: "A human"
    });
    
    newUser.save((err) => {
        if(err){
            res.render('homePage',{loginErr:'', signSuccess:'',signErr:'You have to be unique!',layout:false});
    
        }else{

            res.render('homePage',{loginErr:'', signSuccess:'Nice to meet you!',signErr:'',layout:false});
    
        }
    });
};

module.exports.profileGet = (req,res) => {
    
        User.findOne({nick: req.params.nick},(err,result) => {
            if(err){
                console.log("Hata va: " + err);
            }else{
                if(req.params.nick != req.session.authenticatedUser.nick){
                res.render('profilePage.ejs',{user: req.session.authenticatedUser,profileOwner:result});
                }else{
                    res.render('selfProfilePage',{user: result});
                }
            }
        });
    
};

module.exports.follow = (req,res) => {
    User.findByIdAndUpdate(req.session.authenticatedUser._id,{$push:{followings:req.params.newFollowing}},
        (err,suc) => {
            if(err){
                console.log("problemler: " + err);
            }else{
                User.updateAuthenticatedUser(req);
                User.findOneAndUpdate({nick:req.params.newFollowing},{$push:{followers:req.session.authenticatedUser.nick}},
                    (err,suc) => {
                        if(err){
                            console.log("problemler: " + err);
                        }else{
                            res.redirect('/users/' + req.params.newFollowing);
                        }
                });
                
            }
        }
    );
};

module.exports.unFollow = (req,res) => {

    User.findByIdAndUpdate(req.session.authenticatedUser._id,{$pull: {followings: req.params.exFollowing}},(err, suc) => {
        if(err){
            console.log("problemler: " + err);
        }else{
            User.updateAuthenticatedUser(req);
            User.findOneAndUpdate({nick: req.params.exFollowing},{$pull: {followers: req.session.authenticatedUser.nick}},(err,suc) => {
                if(err){
                    console.log("problemler: " + err);
                }else{
                    res.redirect('/home');
                }
            });
        }
    });


 };


 module.exports.bioUpdate = (req,res) => {
     User.findByIdAndUpdate(
         req.session.authenticatedUser._id,
         {$set:{bio:req.body.bioUpdate}},
         (err,result) =>{
            if(err){console.log(err)
            }else{
                User.updateAuthenticatedUser(req);
                res.redirect('/users/' + req.session.authenticatedUser.nick);
            }
        }
     );
 };