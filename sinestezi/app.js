const express = require('express');
const path = require('path');
const app = express();

const session = require('express-session');

const db = require('./models/db');

app.use('/public',express.static(path.join(__dirname,'public')));

app.set('view engine', 'ejs');


const ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);


const bodyParser = require('body-parser');
const { nextTick } = require('process');

app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
  secret: 'special key',
  resave: false,
  saveUninitialized: true
}));

require('./routes/routeManeger').constructor(app);

app.listen(8000);