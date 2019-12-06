const express = require('express')
const app = express()
var morgan = require('morgan')
const port = 3000
const bookRouter = express.Router();
const mongoose = require('mongoose');
const book = require("./Models/bookModel")
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser')
    // const swaggerDocument = require('./swagger.json');

//Middleware
app.use(morgan('dev'))
    // parse application/json
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
    // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/studentmgt', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});


bookRouter.route("/book")
    .get((req, res) => {
        const { query } = req;
        book.find(query, (err, books) => {
            if (err) {
                console.log(`Error: ` + err)
                return res.send(err)
            } else {
                if (books.length === 0) {
                    console.log("message")
                    return res.json(`Number of Record ${books.length}`)
                } else {
                    return res.json(books)
                }
            }
        });

    })



bookRouter.route("/book/:bookId")
    .get((req, res) => {
        const bookid = req.params.bookId;
        book.findById(bookid, (err, book) => {
            if (err) {
                console.log(`Error: ` + err)
                return res.send(err)
            } else {
                if (!book) {
                    return res.send(`${bookid} - not found`)
                } else {
                    return res.json(book)
                }
            }
        });
    })


bookRouter.route("/book")
    .post((req, res) => {
        let bk = new book(req.body);
        bk.save();
        return res.status(201).json(bk)
    })

app.use("/api", bookRouter)



app.get('/', (req, res) => res.send('Web API  !'))
app.listen(port, () => console.log(`app listening on port!`))