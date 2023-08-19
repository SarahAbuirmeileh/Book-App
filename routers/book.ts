import express from 'express'
import data from "../data/MOCK_DATA.js"
import { Book } from '../types/book.js'

const router = express.Router()

router.get('/', (req: Book.IRequast, res) => {
    // get the book by title
    const bookTitle = req.query.title
    if (bookTitle) {
        const resultBook = data.filter(book => book.title === bookTitle)
        if (resultBook) {
            return res.status(200).send(resultBook);
        } else {
            return res.status(404).send("Book not found :(");
        }
    }


    // get the book by publicationing Year
    const bookPublicationYear = parseInt(req.query.publicationYear)
    if (bookPublicationYear) {
        const book = data.filter(book => book.publicationYear === bookPublicationYear)
        if (book) {
            console.log(book)
            return res.status(200).send(book);
        } else {
            return res.status(404).send("Book not found :(");
        }

    }

    // get all books
    const page = parseInt(req.query.page || '1')
    const pageSize = parseInt(req.query.pageSize || '10')
    const filtered = data.slice((page - 1) * pageSize, page * pageSize)
    res.send({
        page,
        pageSize,
        total: data.length,
        items: filtered
    })
})

router.get("/:id", (req, res) => {
    if (!req.params.id) {
        return res.send('Error: Please send student ID in query params!');
    } else {
        const bookId = parseInt(req.params.id)
        const resultBook = data.find(book => book.id === bookId)
        if (resultBook) {
            res.status(200).send(resultBook);
        } else {
            res.status(404).send("Book not found :(");
        }
    }
})

router.post("/", (req: Book.IRequast, res) => {
    if (!req.body.id || !req.body.title || !req.body.author || !req.body.publicationYear) {
        return res.status(400).send("Send the whole data (id, title, auther, publicationYear)")
    }
    const newBook: Book.IBook = {
        "id": req.body.id,
        "title": req.body.title,
        "author": req.body.author,
        "publicationYear": req.body.publicationYear
    }
    data.push(newBook)
    res.status(200).send("Book is added :)")
})

router.put("/:id", (req, res) => {

    const bookId = parseInt(req.params.id)

    for (let i = 0; i < data.length; i++) {
        if (data[i].id === bookId) {
            data[i] = { ...data[i], ...req.body };
            return res.status(200).send("Book edited :)")
        }
    }
    res.send("There is no book with this id :(");
})

router.delete("/:id", (req, res) => {
    if (!req.params.id) {
        return res.send('Error: Please send student ID in query params!');
    } else {
        const bookId = parseInt(req.params.id.toString())

        let found = data.findIndex((std) => std.id === bookId);
        if (found >= 0) {
            data.splice(found, 1);
            return res.status(200).send("Book deleted :)")
        } else {
            res.send("There is no book with this id :(");
        }
    }
})

export default router