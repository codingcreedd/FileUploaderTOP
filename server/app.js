require('dotenv').config();

const express = require('express');
const app = express();
const sessionStore = require('./prisma/db/index').sessionStore;
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');

//middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false
    }
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


require('./config/passport')
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    next();
});


//ROUTES
const logs = require('./routes/logs');
const folders = require('./routes/folders');
const files = require('./routes/files');

app.use('/logs', logs);
app.use('/folders', folders);
app.use('/files', files);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})