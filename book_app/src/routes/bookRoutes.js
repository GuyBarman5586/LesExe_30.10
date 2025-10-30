import { Router } from 'express';
import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} from '../controllers/bookController';

const router = Router();

// GET all books
router.get('/', (req, res) => {
    const books = getAllBooks();
    res.json(books);
});

// GET a single book by ID
router.get('/:id', (req, res) => {
    const book = getBookById(req.params.id);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
});

// POST create a new book
router.post('/', (req, res) => {
    const bookData = req.body;
    if (!bookData.title || !bookData.author) {
        return res.status(400).json({ message: 'Title and author are required' });
    }
    const newBook = createBook(bookData);
    res.status(201).json(newBook);
});

// PUT update a book
router.put('/:id', (req, res) => {
    const updatedBook = updateBook(req.params.id, req.body);
    if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.json(updatedBook);
});

// DELETE a book
router.delete('/:id', (req, res) => {
    const deleted = deleteBook(req.params.id);
    if (!deleted) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.status(204).send();
});

export default router;