
import {storageService} from './async-storage-service.js'
import { booksService } from './books-service.js';
import { utilService } from './utills-service.js';

export const reviewsService = {
    getEmptyReview,
    remove,
    // save,
}


// const REVIEW_KEY = 'reviews';


// function query() {
//     return storageService.query(REVIEW_KEY);
// }

function remove(bookId, reviewId) {
    return booksService.getById(bookId).then((book)=>{
        let reviews = book.reviews;
        let reviewIndx = reviews.findIndex(review => review.id === reviewId);
        reviews.splice(reviewIndx, 1);
        return booksService.save(book) 
    })
}

// function save(review) {
//     if(review.id){
//         return storageService.put(REVIEW_KEY, review)
//     }else{
//         return storageService.post(REVIEW_KEY, review)
//     }
  
// }


// function getById(reviewId){
//   return storageService.get(REVIEW_KEY, reviewId);
    
// }


function getEmptyReview() {
    return {
        id: utilService.makeId(),
        userName: '',
        rate: 0,
        readAt: '', 
        freeTxt: '',
    };
}


