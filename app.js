const express = require('express')
const app = express()
var morgan = require('morgan')
const port = 3000
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

//Routes
const book = require("./Models/bookModel")
const bookRouter = require("./Routes/BookRouter")(book)




//Middleware
app.use(morgan('dev'));
//parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


mongoose.Promise = global.Promise;


if (process.env.ENV == "Test") {
    mongoose.connect("mongodb://localhost:27017/studentmgt_test")

} else {
    mongoose.connect("mongodb://localhost:27017/studentmgt", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }, (err) => {
        if (!err) {
            console.log('MongoDB Connection Succeeded.')
        } else {
            console.log('Error in DB connection: ' + err)
        }
    })
}

// Connect MongoDB at default port 27017.




app.use("/api", bookRouter)



app.get('/', (req, res) => res.send('Web API  !'))
app.server = app.listen(port, () => console.log(`app listening on port!`))

module.exports = app;