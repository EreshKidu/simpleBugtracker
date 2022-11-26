
const express = require ('express');
const path = require ('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');


const dbUrl = 'mongodb://localhost:27017/simple-Bugtracker';

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

const projectRoutes = require('./routes/projects');
const issueRoutes = require('./routes/issues');
const commentRoutes = require('./routes/comments');




app.use (`/projects`, projectRoutes);
app.use  (`/projects/:projectId/issues`, issueRoutes);
app.use  (`/projects/:projectId/issues/:issueId/comments`, commentRoutes);



app.get ('/', (req, res) => {
    console.log (`Request time is ${req.requestTime}`);
    res.render('dashboard')
})


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