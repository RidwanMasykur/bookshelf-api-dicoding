const { nanoid } = require('nanoid');
const books = require('./books');

const addbookhandler = (request, h) => {
    const {
        name, 
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading 
    } = request.payload;

    if (!name) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        });

        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        });

        response.code(400);
        return response;
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id
            }
        });

        response.code(201);
        return response;
};

const getbookhandler = (_, h) => {
    const databook = books.map(book => ({id: book.id, name: book.name, publisher: book.publisher}))
    const response = h.response({
        status: "success",
        "data": {
            "books": databook
        }});

    response.code(200);
    return response
};

const getbookidhandler = (request, h) => {
    const {bookId} = request.params;

    const book = books.find(book => book.id === bookId)
    if (!book) {
        const response = h.response({
            status: "fail",
            message: "Buku tidak ditemukan"
        });

        response.code(404);
        return response;
    }

        const response = h.response({
            status: "success",
            data: {
                book
            }
        });

        response.code(200);
        return response;
    }

const editbookidhandler = (request, h) => {
    const {bookId} = request.params;

    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;

    const updatedAt = new Date().toISOString();
    const editId = books.findIndex(book => book.id === bookId);

    if (!name) {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        });

        response.code(400);
        return response;
    }

    
    if (editId === -1) {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan"
        });

        response.code(404);
        return response;
    }

    books[editId] = {
        ...books[editId],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt,
    };

    const response = h.response({
        status: "success",
        message: "Buku berhasil diperbarui"
    });

    response.code(200);
    return response;
};

const deletebookidhandler = (request, h) => {
    const {bookId} = request.params;

    const editId = books.findIndex(book => book.id === bookId);

    if (editId !== -1) {
        books.splice(editId, 1);
        const response = h.response({
            status: "success",
            message: "Buku berhasil dihapus"
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan"
    });

    response.code(404);
    return response
}

module.exports = {
    addbookhandler, getbookhandler, getbookidhandler, editbookidhandler, deletebookidhandler
};