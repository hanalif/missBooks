import bookPrice from "../components/book-price.js";
import longTxt from "../components/long-txt.js";
import { booksService } from "../service/books-service.js";
import reviewAdd from "../components/review-add.js"
import reviewsList from "../components/reviews-list.js";
import { eventBus } from "../service/event-bus-service.js";
import { reviewsService } from "../service/review-service.js";

export default {
    template: `
    <section class="book-details" v-if="book">
        <div class="prev-next-book-container main-layout">
            <router-link :to="'/book/' + nextBookId">Next Book</router-link>
            <router-link :to="'/book/' + prevBookId">Prev Book</router-link>
        </div>
        
        <div class="book-details-container main-layout">
            <img class="book-details-img" :src="book.thumbnail" alt="book-cover">
            <div class="aside-book-details">
                <div v-if="isOnSale" class="sale sale-container">
                    <h1>ON SALE!</h1>
                </div>
                <p class="book-details-name">{{book.title}}</p>
                <p>Author: {{book.authors[0]}}</p>
                <p>Number of pages: {{book.pageCount}}</p>
                <p>{{readingLevel}}</p>
                <p>Publish Date: {{book.publishedDate}}</p>
                <p v-if="bookStatus">{{bookStatus}}</p>
                <book-price :book="book"/>
                 <long-txt v-if="isReadMore" :txt="book.description"/>
                <p v-else>{{bookDescription}}</p>
                <button @click="toggleReadMore">read {{ isReadMore ? 'less' : 'more' }}</button>
                <button @click="openReviewComponent" class="book-btn">Add Review</button>
                <router-link to="/book" class="book-btn">back</router-link>
                <review-add v-if="isAddReview" @saveReview="saveReviewToBook" :bookId="book.id" @closeModal="onBackdropClicked"></review-add>
            </div>
        </div>
        <div class="reviews-container">
        <reviews-list class="main-layout" @deleteReview="deleteReview" @openReviewModal="openReviewComponent" :bookReviews="book.reviews"></reviews-list>
        </div>
    </section>
    `,
    data() {
        return {
            book: null,
            isReadMore: false,
            isAddReview: false,
            nextBookId: null,
            prevBookId: null
        };
    },
    methods: {
        toggleReadMore() {
            this.isReadMore = !this.isReadMore;
        },
        openReviewComponent() {
            this.isAddReview = true;
        },
        onBackdropClicked() {
            this.isAddReview = false;
        },
        saveReviewToBook(reviewToEdit) {
            const msg = {
                txt: 'successfuly saved',
                type: 'success'
            }
            eventBus.$emit('show-msg', msg);
            booksService.addReview(this.book.id, reviewToEdit)
                .then(book => this.book = book);
            this.isAddReview = false;
        },
        deleteReview(reviewId) {
            reviewsService.remove(this.book.id, reviewId).then(book => {
                this.book = book;
            })
        },


    },

    computed: {
        readingLevel() {
            let bookPageCount = this.book.pageCount;
            let msg = ''
            if (bookPageCount > 500) {
                msg = 'Long reading';
            } else if (bookPageCount > 200) {
                msg = 'Decent Reading';
            } else if (bookPageCount < 100) {
                msg = 'Light Reading';
            }
            return msg;
        },
        bookStatus() {
            let publishedYear = this.book.publishedDate;
            let currYear = new Date().getFullYear();
            let diff = currYear - publishedYear;
            if (diff > 10) {
                return 'Veteran Book'
            } else if (diff <= 1 || diff === 0) {
                return 'New!'
            } else {
                return null;
            }
        },
        isOnSale() {
            return this.book.listPrice.isOnSale;
        },
        bookDescription() {
            let bookDescription = this.book.description;
            let shortDescriprion = bookDescription.slice(0, 100);
            return shortDescriprion + '...'
        },


    },
    created() {

    },
    watch: {
        '$route.params.bookId': {
            immediate: true,
            handler() {
                const { bookId } = this.$route.params;
                booksService.getById(bookId)
                    .then(book => {
                        this.book = book
                        booksService.getNextBookId(this.book.id)
                            .then(bookId => {
                                this.nextBookId = bookId;
                            });
                        booksService.getPrevBookId(this.book.id)
                            .then(bookId => {
                                this.prevBookId = bookId;
                            });
                    });
            }
        }
    },
    components: {
        bookPrice,
        longTxt,
        reviewAdd,
        reviewsList
    }
};
