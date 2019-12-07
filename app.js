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



app.use("/api", bookRouter)



app.get('/', (req, res) => res.send('Web API  !'))
app.listen(port, () => console.log(`app listening on port!`))