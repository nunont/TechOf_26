require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const AuthRouter = require('./api/users/auth.router');
const PostRouter = require('./api/posts/post.router');


const app = express();
app.use(express.json());
app.set('query parser', 'extended');

app.use('/api/auth', AuthRouter)
app.use('/api/posts', PostRouter);


mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);

app.listen(process.env.PORT, (error) => {
    if (error){
        console.log(error)
    }
    console.log("Api começou na porta", process.env.PORT);
})