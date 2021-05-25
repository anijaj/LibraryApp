const express = require('express');
const fs = require('fs');
const authsRouter = express.Router();
const authorData = require('../model/authorData');

router = postNav =>
{   
    

    authsRouter.get('/', (req, res) =>
    {
        authorData.find().then(authors =>
            {
                res.render("authors", {postNav, authors});
            });
    });
    
    authsRouter.get('/:id', (req,res) =>
    {
        const id = req.params.id;
        authorData.findOne({_id: id}).then(author =>
            {
                res.render("singleAuth", {postNav, author});
            });
    });

    return authsRouter;
}

module.exports = router;