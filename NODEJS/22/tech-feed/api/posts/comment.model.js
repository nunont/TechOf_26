const mongoose = require('mongoose');

var CommentModel = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('comment', CommentModel);