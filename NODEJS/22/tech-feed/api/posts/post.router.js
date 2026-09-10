const express = require('express');
const PostController = require('./post.controller');
const CommentController = require('./comment.controller');
const authMiddleware = require('./../users/auth.middleware')
const postRouter = express.Router();

postRouter.post('/', authMiddleware.verifyAuthentication, PostController.createPost);
postRouter.get('/', PostController.getAllPosts);

postRouter.post('/:id/comment', authMiddleware.verifyAuthentication, CommentController.createComment);
postRouter.get('/:id', PostController.getPostById);
postRouter.put('/:id', authMiddleware.verifyAuthentication, PostController.updatePost);
postRouter.delete('/:id', 
    [
        authMiddleware.verifyAuthentication, 
        authMiddleware.isAdmin
    ],
    PostController.deletePost);

module.exports = postRouter;