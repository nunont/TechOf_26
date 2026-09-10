const PostModel = require("./post.model")
const TagModel = require('./tag.model');
const { preparePagination, prepareSort, prepareFilter } = require('./../../shared/pagination-utils')

exports.createPost = (req, res) => {
    req.body.user = req.currentUser._id;
    const newPost = new PostModel(req.body);
    newPost.save()
    .then((Post) => {
        res.status(201).json(Post);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err.errors);
    });
}

/* exports.createPost = async (req, res) => {
    try {
        const newPost = await PostModel.create(req.body);
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json(error.errors)
    }
} */

exports.getAllPosts = (req, res) => {
    const pagination = preparePagination(req.query)
    const sort = prepareSort(req.query);
    const filter = prepareFilter(req.query, PostModel);

    let fields = '';
    if (req.query.fields){
        fields = req.query.fields.split(',');
    }

    PostModel.find(filter)
        .select(fields)
        .limit(pagination.limit)
        .skip(pagination.limit * (pagination.page - 1))
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.status(500).json(error.errors);
        })
}

exports.getPostById = (req, res) => {
    PostModel.findById(req.params.id)
        .populate({
            path: "comments"
        })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json(error.errors);
        })
}

exports.updatePost = (req, res) => {
    PostModel.findByIdAndUpdate(req.params.id, 
        req.body, {returnDocument: 'after', runValidators: true})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.status(500).json(error);
        })
}

exports.deletePost = (req, res) => {
    /* PostModel.findById(req.params.id)
    .then((Post) => {
        if (Post.createdBy != req.currentUser.id
            || req.currentUser.role == "admin"
        ){
            //RESPOSTA ERRO
        }

        return PostModel.deleteOne({ _id: Post._id})
    })
    .then((result) => {
        res.status(200).send();
    })
    .catch(error => {
        res.status(500).json(error.errors);
    }) */

    PostModel.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.status(200).send();
    })
    .catch(error => {
        res.status(500).json(error.errors);
    })
}

exports.statisticsPosts = (req, res) => {
    PostModel.aggregate([
        {
            $match: { balance: { $gt : 100}}
        },
        {
            $group: {
                _id: null,
                sum: { $sum: '$balance'},
                count: { $sum: 1 },
                avg: { $avg: '$balance' },
                min: { $min: '$balance' },
                max: { $max: '$balance'}
            }
        }
    ])
    .then((result) => {
        res.status(200).json(result)
    })
    .catch(error => {
        res.status(500).json(error.errors);
    })
}

exports.statisticsPostsByCountry = (req, res) => {
    PostModel.aggregate([
        {
            $match: { }
        },
        {
            $group: {
                _id: '$country',
                sum: { $sum: '$balance'},
                count: { $sum: 1 },
                avg: { $avg: '$balance' },
                min: { $min: '$balance' },
                max: { $max: '$balance'},
                items: { $push: { balance: '$balance', name: '$name' }}
            }
        }
    ])
    .then((result) => {
        res.status(200).json(result)
    })
    .catch(error => {
        res.status(500).json(error.errors);
    })
}