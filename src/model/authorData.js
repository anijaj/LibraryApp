const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:12345@ictak.06fab.mongodb.net/LibraryApp?retryWrites=true&w=majority');

const Schema = mongoose.Schema;

const authorSchema = new Schema(
    {
        name: String,
        nationality: String,
        img: String
    }
);

var authorData = mongoose.model('authordatas',authorSchema);

module.exports = authorData;