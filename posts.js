const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

//Add Post


//Delete Post

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://lukechet:Coursework2@coursework2.vamzo.mongodb.net/Coursework2?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('Coursework2').collection('posts'); // DATABASE NAME SEEMS TO BE INCORRECT, MAYBE MONGODB DB IS NOT CREATED YET
}

module.exports = router;