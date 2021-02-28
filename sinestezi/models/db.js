const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const mongoDB = 'mongodb://localhost/deneme';

mongoose.connect(mongoDB,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Nice!');
    }
});