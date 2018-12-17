const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');


const app = express();

//bodyparser Middleware
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDb connected...'))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/items', items);

//listen on port environment or 5000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port  ${port} `));