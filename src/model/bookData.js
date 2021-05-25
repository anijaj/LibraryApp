const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:12345@ictak.06fab.mongodb.net/LibraryApp?retryWrites=true&w=majority');

const Schema = mongoose.Schema;

const bookSchema = new Schema(
    {
        title: String,
        author: String,
        genre: String,
        img: String
    }
);

var bookData = mongoose.model('bookdatas',bookSchema);

module.exports = bookData;