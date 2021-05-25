const express = require('express');
const fs = require('fs');
const addauthorRouter = express.Router();
const authorData = require('../model/authorData');
const bodyParser = require('body-parser');
const { db, collection } = require('../model/authorData');

const urlencodedParser = bodyParser.urlencoded({extended: false});

router = postNav =>
{
    addauthorRouter.get('/', (req,res) =>
    {
        res.render("addauthor",{postNav});
    });

    addauthorRouter.post('/', urlencodedParser, (req,res) =>
    {
        
        var submit = req.body.submit;
        if (submit == "update")
        {
            collection.updateOne(
                {$and: [{name: req.body.name}, {nationality: req.body.nationality}]},
                {$set: {name: req.body.name, 
                    nationality: req.body.nationality,
                    img: req.body.img}
                },
                {upsert: true}
            , () =>
            {
                res.render("addauthor", {postNav, err: "Author name already added/ Author not found"});
            });
        }
        else if (submit == "delete")
        {
            collection.deleteMany(
                {$and: [{name: req.body.name}, {nationality: req.body.nationality}]}
            , () =>
            {
                res.render("addauthor", {postNav, err: "Author not found"});
            });
        }
        
        
    });

    return addauthorRouter;
}

module.exports = router;