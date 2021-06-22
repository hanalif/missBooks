
import { booksService } from "../service/books-service.js";
import starRating from "../components/star-rating.js"
import { reviewsService } from "../service/review-service.js";


export default {
    props: ['bookId'],
    template: `
    <div class="review-add" v-if="reviewToEdit">
        <form @submit.prevent="">
        <button class="close-review-modal-btn" @click="closeModal">X</button>
        <h1>Add Review</h1>
            <input v-model="reviewToEdit.userName" type="text" placeholder="Reader's name">
            <star-rating @rate="updateRating"></star-rating>
            <label for="read-at-input"> Read at:</label>
            <input id="read-at-input" v-model="reviewToEdit.readAt" type="date">
            <textarea v-model="reviewToEdit.freeTxt" rows="4" cols="50" placeholder="Free text..."></textarea>
            <button class="book-btn" @click="save">save</button>
        </form>
    </div>
    `,
    data(){
        return {
            reviewToEdit: null,
            book: null
        }
    },
    created() { 
        this.reviewToEdit = reviewsService.getEmptyReview();
    },
    computed:{
        
    },
    methods: {
        updateRating(num){
            this.reviewToEdit.rate = num;
        },
        closeModal(){
            this.$emit('closeModal');
        },
        save(){
            this.$emit('saveReview', this.reviewToEdit);
        }
    },
    components: {
        starRating
    }
};

