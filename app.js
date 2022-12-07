
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}



const express = require ('express');
const path = require ('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const multer = require('multer');
const morgan = require('morgan')
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const ExpressError = require('./utils/ExpressError');
const helmet = require("helmet");


// const dbUrl = 'mongodb://localhost:27017/simple-Bugtracker';
const dbUrl = process.env.MONGODBURI;


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = dbUrl;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("simbplebugtrackerdb").collection("devices");
  // perform actions on the collection object
  client.close();
});


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
    

});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});





const app = express ();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "script-src": ["'self'", "cdn.jsdelivr.net", "unpkg.com", "'unsafe-inline'"],
       "script-src-attr": ["'self'", "cdn.jsdelivr.net", "unpkg.com", "'unsafe-inline'"],
       mediaSrc: ["https://res.cloudinary.com/"],
      imgSrc: [
        "'self'",
        "blob:",
        "data:",
        "https://res.cloudinary.com/",
        "https://images.unsplash.com/",
      ],

      },
      

    },
    crossOriginEmbedderPolicy: false,

  }));


const projectRoutes = require('./routes/projects');
const issueRoutes = require('./routes/issues');
const commentRoutes = require('./routes/comments');
const userRoutes = require('./routes/user');
const projectTeamRoutes = require('./routes/projectTeam');

const secret = process.env.SECRET || 'verybadsecret';
const sessionConfig = {
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000* 60 * 60 *24*7,
        maxAge: 1000* 60 * 60 *24*7
    }
}

app.use (session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use ((req, res, next) => {
    console.log (req.query);
    res.locals.currentUser = req.user;
    next();
})


app.use (`/projects`, projectRoutes);
app.use  (`/projects/:projectId/issues`, issueRoutes);
app.use  (`/projects/:projectId/team`, projectTeamRoutes);
app.use  (`/projects/:projectId/issues/:issueId/comments`, commentRoutes);
app.get ('/about', (req, res) => {
    const pageName = 'about';
    res.render ("about", {pageName})
})
// app.use  (`/projects/:projectId/issues/:issueId/team`, issueTeamRoutes);

app.use ('/', userRoutes);




app.all('*', (req, res, next) => {
    next (new ExpressError('Page not found', 404))
})

app.use ((err, req, res, next) => {
    const {statusCode = 500} = err;
    if (!err.message) message = 'Something is bad';
    res.status(statusCode).render('error', { err });
   
})

const port = process.env.PORT || 3000;

app.listen (port, () => {
    console.log (`Serving on port ${port}`)
})