import { Router } from 'express';
import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} from '../controllers/bookController';

const router = Router();

/**
 * @route GET /api/books
 * @description Retrieve all books from the database
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Array} Array of book objects
 */
router.get('/', async (req, res, next) => {
    try {
        const books = await getAllBooks();
        res.json(books);
    } catch (error) {
        next(error);
    }
});

/**
 * @route GET /api/books/:id
 * @description Retrieve a specific book by its ID
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} Book object if found
 * @throws {404} If book is not found
 */
router.get('/:id', async (req, res, next) => {
    try {
        const book = await getBookById(req.params.id);
        if (!book) {
            const error = new Error('Book not found');
            error.status = 404;
            throw error;
        }
        res.json(book);
    } catch (error) {
        next(error);
    }
});

/**
 * @route POST /api/books
 * @description Create a new book
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} Newly created book object
 * @throws {400} If title or author is missing
 */
router.post('/', async (req, res, next) => {
    try {
        const bookData = req.body;
        if (!bookData.title || !bookData.author) {
            const error = new Error('Title and author are required');
            error.status = 400;
            throw error;
        }
        const newBook = await createBook(bookData);
        res.status(201).json(newBook);
    } catch (error) {
        next(error);
    }
});

/**
 * @route PUT /api/books/:id
 * @description Update an existing book by its ID
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} Updated book object
 * @throws {404} If book is not found
 */
router.put('/:id', async (req, res, next) => {
    try {
        const updatedBook = await updateBook(req.params.id, req.body);
        if (!updatedBook) {
            const error = new Error('Book not found');
            error.status = 404;
            throw error;
        }
        res.json(updatedBook);
    } catch (error) {
        next(error);
    }
});

/**
 * @route DELETE /api/books/:id
 * @description Delete a book by its ID
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {undefined}
 * @throws {404} If book is not found
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const deleted = await deleteBook(req.params.id);
        if (!deleted) {
            const error = new Error('Book not found');
            error.status = 404;
            throw error;
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;