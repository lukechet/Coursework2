const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./posts');
app.use(posts);

const frontend = require('./frontendcw2');
app.use(frontend);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('server started on port 3000'));
