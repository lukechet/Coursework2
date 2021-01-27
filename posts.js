const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


//Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});


//get one post
router.get('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.findOne({_id: new mongodb.ObjectID(req.params.id)}, (e, result) => {
        if (e) return next (e)
        res.send(result)
    })
});


//Add Post 
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insert(req.body, (e, results) => {
        if(e) return next(e)
        res.send(results.ops)
    })
});


//Delete Post MAY BE WRONG
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});


// Update a post with PUT
router.put('/:id', (req, res, next) => {
    req.posts.update(
    {_id: new mongodb.ObjectID(req.params.id)},
    {$set: req.body},
    {safe: true, multi: false},
    (e, result) => {
        if (e) return next(e)
        res.send((result.result.n === 1) ? {msg:'success'} : {msg: 'error'})
    })
});



async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://lukechet:Coursework2@coursework2.vamzo.mongodb.net/Coursework2?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('coursework2').collection('posts');
}

module.exports = router;