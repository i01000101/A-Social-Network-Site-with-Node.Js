const usersRoute = require('./usersRoute');
const homeRoute = require('./homeRoute');


module.exports.constructor = (app) => {

    app.use('/users', usersRoute);
    app.use('/home', homeRoute);

    app.get('/', (req,res) =>{
        
        if(req.session.authenticatedUser === undefined){
            res.render('homePage',{loginErr:'',signSuccess:'',signErr:'',layout:false});
        }else{
            res.redirect('/home');
        }

    });

    app.get('/logout', (req,res) => {
        req.session.destroy();
        res.redirect('/');
    });
};
