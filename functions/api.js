const express = require('express');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const api = express();

const posts = express.Router();
posts.get('/', async (req, res) => {
    const {limit = 100} = req.query;
    try {
        const result = await admin.firestore().collection('posts')
                // .orderBy('date', 'desc')
                // .limit(limit)
                .get();
        return res.send(`<pre>${JSON.stringify({ message: 'This is the root posts route.', docs: result.docs.map(d => d.data()) }, null, 2)}</pre>`);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ e });
    }
});

api.use('/posts', posts);

module.exports = { api };
