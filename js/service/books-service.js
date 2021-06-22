import {booksList} from './books-list.js'
import { utilService } from './utills-service.js';
import {storageService} from './async-storage-service.js'
export const booksService = {
    query,
    getById,
    addReview,
    save,
    getNextBookId,
    getPrevBookId,
    getGoogleBooks
}


function getGoogleBooks(searchValue) {
    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchValue}`;
    return axios.get(url)
        .then(res => res.data)   
}

const BOOKS_KEY = 'books';
const gBooks = _createBooks();

function query() {
    return storageService.query(BOOKS_KEY);
}

function remove(bookId) {
    return storageService.remove(BOOKS_KEY, bookId)
}

function save(book) {
    if(book.id){
        return storageService.put(BOOKS_KEY, book)
    }else{
        return storageService.post(BOOKS_KEY, book)
    }
  
}

function getNextBookId(bookId) {
    return query()
        .then(books =>{
            const idx = books.findIndex(book => bookId === book.id)
            return (idx === books.length - 1) ? books[0].id : books[idx + 1].id;
        })
}

function getPrevBookId(bookId){
    return query()
        .then(books =>{
            const idx = books.findIndex(book => bookId === book.id)
            return (idx === 0) ? books[books.length-1].id : books[idx - 1].id;
        })
};

function addReview(bookId, review){
    return getById(bookId).then((book)=>{
        console.log(review);
        if(!book.reviews){
           book.reviews = [] ;
        }
        book.reviews.push(review)
        return storageService.put(BOOKS_KEY, book)
    })
}


function getById(bookId){
  return storageService.get(BOOKS_KEY, bookId);
    
}



function _createBooks() {
    let books = utilService.loadFromStorage(BOOKS_KEY);
    if (!books || !books.length) {
        books = booksList.getInitialBooks();
        utilService.saveToStorage(BOOKS_KEY, books);
    }
    return books;
}


