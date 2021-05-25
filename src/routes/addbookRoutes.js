const express = require('express');
const fs = require('fs');
const addbookRouter = express.Router();
const bookData = require('../model/bookData');
const bodyParser = require('body-parser');
const { db, collection } = require('../model/bookData');

const urlencodedParser = bodyParser.urlencoded({extended: false});

router = postNav =>
{
    addbookRouter.get('/', (req,res) =>
    {
        res.render("addbook",{postNav});
    });

    addbookRouter.post('/', urlencodedParser, (req,res) =>
    {
        // var books = JSON.parse(fs.readFileSync('./public/books.json'));
        // books.push(req.body);
        // fs.writeFileSync('./public/books.json', JSON.stringify(books));

        // var item = 
        // {
        //     title: req.body.title,
        //     author: req.body.author,
        //     genre: req.body.genre,
        //     img: req.body.img
        // };

        //var books = bookData(item);

        var submit = req.body.submit;
        if (submit == "update")
        {
            collection.updateOne(
                {$and: [{title: req.body.title}, {author: req.body.author}]},
                {$set: {title: req.body.title, 
                    author: req.body.author,
                    genre: req.body.genre,
                    img: req.body.img}
                },
                {upsert: true}
            , () =>
            {
                res.render("addbook", {postNav, err: "Book already added/ Book not found"});
            });
        }
        else if (submit == "delete")
        {
            collection.deleteMany(
                {$and: [{title: req.body.title}, {author: req.body.author}]}
            , () =>
            {
                res.render("addbook", {postNav, err: "Book not found"});
            });
        }
        
        
    });

    return addbookRouter;
}

module.exports = router;