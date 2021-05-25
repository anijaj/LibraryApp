const express = require('express');
const signRouter = express.Router();
const userData = require('../model/userData');
const { db, collection } = require('../model/userData');
const {check, validationResult} = require('express-validator');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const passportLocalMongoose = require('passport-local-mongoose');

const urlencodedParser = bodyParser.urlencoded({extended: false});

router = preNav =>
{   
    signRouter.get('/', (req,res) =>
    {
        res.render("signup", {preNav});
    });

    signRouter.post('/', urlencodedParser,
    [
        check('username').isLength({min: 5}),
        check('email').isEmail(),
        check('password').isStrongPassword(),
    ], (req,res) =>
    {
        const errors = validationResult(req);
        if (!errors.isEmpty())
        {
            return res.status(422).jsonp(errors.array());
        }
        else
        {
            // collection.insertOne(
            //     {
            //         username: req.body.username,
            //         email: req.body.email,
            //         password: req.body.password
            //     }
            // );
            User = new userData(
                {
                    username: req.body.username,
                    email: req.body.email
                }
            );

            userData.register(User, req.body.password);
            
            res.render("signup",{preNav, msg: "Successfully Signed Up"});
        }
    });

    return signRouter;
}

module.exports = router;