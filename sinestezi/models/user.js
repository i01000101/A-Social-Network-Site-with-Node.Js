const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    nick: {type:String, unique:true},
    email: {type:String, unique:true},
    password: String,

    bio: String,
    color: String,
    followers: [String],
    followings: [String],

    posts: [{
        author: {
            name: String,
            nick: String
        },
        content: String,
        date: Date,
        simpleDate: String,
        color: String,
        likes: [String]
    }]
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;


module.exports.updateAuthenticatedUser = (req) => {
    Users.find({nick: req.session.authenticatedUser.nick},
        (err,results) => {
            
                req.session.authenticatedUser = results[0];
            
    });
    
};