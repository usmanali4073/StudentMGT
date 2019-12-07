const express = require('express');

function routes(book) {

    const bookRouter = express.Router();

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

    bookRouter.use("/book/:bookId", (req, res, next) => {
        const bookid = req.params.bookId;
        book.findById(bookid, (err, book) => {
            if (err) {
                console.log(`Error: ` + err)
                return res.send(err)
            } else {
                if (!book) {
                    return res.statusCode(404)
                } else {
                    req.book = book;
                    return next();
                }
            }
        });
    })

    bookRouter.route("/book/:bookId")
        .get((req, res) => {
            return res.json(req.book).status(200)
        }).put((req, res) => {
            let book = req.book;
            book.title = req.body.title;
            book.author = req.body.author;
            book.genre = req.body.genre;
            book.read = req.body.read;
            book.save((err) => {
                if (err) {
                    return res.statusCode(500)
                } else {
                    return res.json(book);
                }
            });

        }).patch((req, res) => {
            let book = req.book;
            Object.entries(req.body).forEach((item) => {
                console.log(req.body)
                let key = item[0];
                let value = item[1];
                book[key] = value;
            })
            book.save((err) => {
                if (err) {
                    return res.statusCode(500)
                } else {
                    return res.json(book);
                }
            });

        }).delete((req, res) => {
            req.book.remove();
            res.sendStatus(403)
        })



    bookRouter.route("/book")
        .post((req, res) => {
            let bk = new book(req.body);
            bk.save();
            return res.status(201).json(bk)
        })

    return bookRouter;
}

module.exports = routes