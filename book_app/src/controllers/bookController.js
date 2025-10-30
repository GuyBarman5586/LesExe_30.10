// In-memory storage for books (replace with a database in a real application)
let books = [];

export const getAllBooks = () => {
    return books;
};

export const getBookById = (id) => {
    return books.find(book => book.id === id);
};

export const createBook = (bookData) => {
    const newBook = {
        id: Date.now().toString(),
        ...bookData,
        createdAt: new Date().toISOString()
    };
    books.push(newBook);
    return newBook;
};

export const updateBook = (id, bookData) => {
    const index = books.findIndex(book => book.id === id);
    if (index === -1) return null;
    
    books[index] = {
        ...books[index],
        ...bookData,
        updatedAt: new Date().toISOString()
    };
    return books[index];
};

export const deleteBook = (id) => {
    const index = books.findIndex(book => book.id === id);
    if (index === -1) return false;
    
    books.splice(index, 1);
    return true;
};