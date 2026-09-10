const PostModel = require('./post.model');
const CommentModel = require('./comment.model');

exports.createComment = (req, res) => {
    PostModel.findById(req.params.id)
    .then((post) => {
        if (!post){
            return res.status(404).json("Post not Found");
        }

        const comment = new CommentModel(req.body);
        return comment.save();
    })
    .then((commentId) => {
        return PostModel.findByIdAndUpdate(req.params.id, { $push: {comments: commentId}});
    })
    .then((post) => {
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).json(err.errors)
    })
}

/* exports.createComment = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);

        if (!post){
            return res.status(404).json("Post not Found");
        }

        const comment = new CommentModel(req.body);
        await comment.save();

        await PostModel.findByIdAndUpdate(req.params.id, { $push: {comments: comment._id}});

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err.errors)
    }
} */