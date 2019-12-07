function bookController(book) {
    function get(req, res) {
        const { query } = req;
        console.log(query)
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
    }

    function getbyId(req, res) {
        return res.json(req.book).status(200)
    }

    return {get, getbyId }

}

module.exports = bookController;