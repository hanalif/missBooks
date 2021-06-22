import { booksService } from "../service/books-service.js";
import reviewPreview from "./review-preview.js"
export default {
    props:['bookReviews'],
    template: `
        <div v-if="bookReviews" class="reviews-list">
            <review-preview v-for="review in bookReviews" @deleteReview="deleteReview" :key="review.id" :review="review"></review-preview>
        </div>
    `,
    data(){
        return{
            book: null,
            reviews : []
        }
    },
    methods: {
        editReview(){
            console.log('edit-review');
            this.$emit('openReviewModal');
        },
        deleteReview(reviewId){
            this.$emit('deleteReview', reviewId)
        }
    },
    created() {

        
    },
    components:{
        reviewPreview
    }
};
