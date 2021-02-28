const User = require('../models/user');

module.exports.homeGet = async (req,res) => {

    var allPosts;

    await User.find({nick : req.session.authenticatedUser.nick},(err,result) =>{
        if(err){
            console.log(err);
        }else{
        allPosts = result[0].posts;
        req.session.authenticatedUser = result[0]
        }
    });
    
    User.find({nick: {$in:req.session.authenticatedUser.followings}},(err,results) => {
        if(err){
            console.log(err);
        }else{
            for(let i = 0; i < results.length; i++){
                allPosts = allPosts.concat(results[i].posts);
            }
            allPosts.sort(function(a,b){return b.date - a.date});
            res.render('streamPage',{user: req.session.authenticatedUser, allPosts});
        }
    });
    
    
};

module.exports.sharePost = (req,res) => {
    var newPost = {
        author: {
            name: req.session.authenticatedUser.name,
            nick: req.session.authenticatedUser.nick
        },
        content: req.body.contentOfSharing,
        date: new Date(),
        simpleDate: (new Date()).toLocaleString(),
        color: req.body.colorSelector
    };
    if(newPost.content.length != 0){
        User.findOneAndUpdate({nick : req.session.authenticatedUser.nick},{$push:{posts:newPost}},
            (err,suc) => {
                if(err){
                    console.log(err);
                }else{
                    //User.updateAuthenticatedUser(req);
                    res.redirect('/home');
                }
            }    
        );
    }else{
        res.redirect('/home');
    }
    
};

module.exports.deletePost = (req,res) => {
       
var index;
    
    User.findOne({'posts._id':req.params.postId},{"posts.$":1,_id:0},(err,result) =>{
        User.findOneAndUpdate({'posts._id': req.params.postId},
            {"$pull":{posts: result.posts[0]}
            }
            ,(err,resulttt) => {
                User.updateAuthenticatedUser(req);
                res.redirect('/');
            });
        console.log(result);
    });
    
}

module.exports.like = (req,res) => {
    
var index;
User.findOne({'posts._id': req.params.postId},(err,results) => {
    if(!err){
        for(let i = 0; i < results.posts.length; i++){
            if(results.posts[i]._id == req.params.postId){
                index=i;
                break;
            }
        }
        User.findOneAndUpdate({'posts._id': req.params.postId},
        {"$push":{["posts."+ index +".likes"]: req.session.authenticatedUser.nick}
        }
        ,(err,result) => {
            res.redirect('/home/'+req.params.postId);
        });
       
    }
});
    

};

module.exports.unLike = (req,res) => {
       
var index;
User.findOne({'posts._id': req.params.postId},(err,results) => {
    if(!err){
        for(let i = 0; i < results.posts.length; i++){
            if(results.posts[i]._id == req.params.postId){
                index=i;
                break;
            }
        }
        User.findOneAndUpdate({'posts._id': req.params.postId},
        {"$pull":{["posts."+ index +".likes"]: req.session.authenticatedUser.nick}
        }
        ,(err,result) => {
            res.redirect('/');
        });
       
    }
});
};

module.exports.showPostDetail = (req,res) => {
    var index;
    User.findOne({'posts._id': req.params.postId},(err,results) => {
    if(!err){
        for(let i = 0; i < results.posts.length; i++){
            if(results.posts[i]._id == req.params.postId){
                index=i;
                User.find({nick:{$in:results.posts[i].likes}},(error,likeResults) => {
                    res.render('post',{user: req.session.authenticatedUser, post: results.posts[i], likeResults});
                });
                
                break;
            }
        }
       
    }
    });
};

module.exports.searchPost = (req,res) => {
    console.log("Aradın");

    User.find(
        {$or :[{name: {$regex: req.body.search, $options: 'i'}},
        {nick: {$regex: req.body.search, $options: 'i'}}]}
        ,(err,results) => {
        res.render('searchPage',{user: req.session.authenticatedUser, results: results});
    });


    
}