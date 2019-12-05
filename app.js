const express = require('express')
const app = express()
var morgan = require('morgan')
const port = 3000
const bookRouter = express.Router();
const mongoose = require('mongoose');
const book = require("./Models/bookModel")

//Middleware
app.use(morgan('combined'))


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
        console.log(query)

        book.find(query, (err, books) => {
            if (err) {
                console.log(`Error: ` + err)
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

app.use("/api", bookRouter)



app.get('/', (req, res) => res.send('Web API  !'))
app.listen(port, () => console.log(`app listening on port!`))