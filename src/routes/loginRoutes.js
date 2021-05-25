const express = require('express');
const loginRouter = express.Router();
//const {check, validationResult} = require('express-validator');
const bodyParser = require('body-parser');
const expressSession = require('express-session')(
    {
    secret: 'secret',
    resave: false,
    saveUninitialized: false
    });
const passport = require('passport');
const userData = require('../model/userData');
const { db, collection } = require('../model/userData');
const connectEnsureLogin = require('connect-ensure-login');

loginRouter.use(bodyParser.json());
loginRouter.use(bodyParser.urlencoded({extended: true}));
loginRouter.use(expressSession);
loginRouter.use(passport.initialize());
loginRouter.use(passport.session());

passport.use(userData.createStrategy());

passport.serializeUser(userData.serializeUser());
passport.deserializeUser(userData.deserializeUser());

router = preNav =>
{   
    loginRouter.get('/', (req,res) =>
    {
        res.render("login",{preNav});
    });

    // loginRouter.post('/', urlencodedParser, 
    // [
    //     check('username').equals("admin"),
    //     check('password').equals("12345")
    // ], (req,res) =>
    // {
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty())
    //     {
    //         return res.status(422).jsonp(errors.array());
    //     }
    //     else
    //     {  
    //         res.redirect("/books");
    //     }
    // });

    loginRouter.post('/', (req,res,next) => 
    {
        passport.authenticate('local', (err,user,info) =>
        {
            if (err)
            {
                return next(err);
            }
            if (!user)
            {
                return res.redirect('?info='+info);
            }

            req.logIn(user, (err) =>
            {
                if (err)
                {
                    return next(err);
                }

                return res.redirect('/books');  
            });
        })(req, res, next);
    });

    loginRouter.get('/',
        connectEnsureLogin.ensureLoggedIn(),
        (req,res) => res.redirect("/books")
        );

    return loginRouter;
}

module.exports = router;