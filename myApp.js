require('dotenv').config();
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

// console.log("Hello World");

// app.get('/', function (req, res) { // string served in root path
//     res.send('Hello Express');
// });

app.use('/public', express.static(__dirname + '/public')); // static assets served in /public URL

app.use(function (req, res, next) { // Root-Level Request Logger Middleware
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get('/now', function (req, res, next) { // Chain Middleware to Create a Time Server
    req.time = new Date().toString();
    next();
}, function (req, res) {
    jsonObject = { time: req.time };
    res.json(jsonObject);
});

app.get('/:word/echo', function (req, res) { // Get Route Parameter Input from the Client (:word means any word)
    const word = req.params.word;
    res.json({ echo: word });
});

app.use(bodyParser.urlencoded({ extended: false })); // Use body-parser to Parse POST Requests

app.route('/name')
    .get(function (req, res) { // Get Query Parameter Input from the Client
        console.log(req.query);
        queryString = req.query;
        res.json({ name: `${queryString.first} ${queryString.last}` });
    })
    .post(function (req, res) { // Get Data from POST Requests
        console.log(req.body.first);
        console.log(req.body.last);
        queryStringInPOST = req.body;
        res.json({ name: `${queryStringInPOST.first} ${queryStringInPOST.last}` });
    });

app.get('/json', function (req, res) { // json object served in /json URL
    const message = "Hello json";
    const final_message = process.env.MESSAGE_STYLE === 'uppercase' ? message.toUpperCase() : message;
    const jsonObject = { "message": final_message };
    res.json(jsonObject);
});

app.get('/', function (req, res) { // file served in root path
    const absoluteFilePath = __dirname + '/views/index.html'; // __dirname + '/relativePath/file.ext'
    res.sendFile(absoluteFilePath);
});











module.exports = app;
