var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var tasks = require("./routes/tasks");
const accounts = require("./routes/signin")

const cors = require("cors");

//UserLogin imports
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');

const config = require('../config/config');

const isDev = process.env.NODE_ENV !== 'production';
const port  = process.env.PORT || 5000;
//End of userLogin imports

// Configuration
// ================================================================================================

// Set up Mongoose
mongoose.connect(isDev ? config.db_dev : config.db).then(() =>
{
    console.log('Connected to mongodb');
}).catch((err) => {
    console.log(err);
});
var app = express();


app.use(
    cors({
        origin: "http://localhost:8081",
        credentials: true
    })
);
// API routes
//View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, "client")));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", tasks);
app.use("/api/account", accounts);

app.listen(port, function () {
    console.log("Server started on port " + port);
});
