
const mongoose = require('mongoose');

const PostModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tag"
        }
    ]
});

PostModel.pre(/^find/, function(){
    this.populate({
            path: "user",
            select: "profile"
        })
        .populate({
            path: "tags",
            select: "name"
        });
})

PostModel.post("findOneAndDelete", async function(doc, next) {
    if (!doc){
        next();
    }
    await mongoose.model('comment').deleteMany({ _id: { $in: doc.comments }})
})

module.exports = mongoose.model('post', PostModel);