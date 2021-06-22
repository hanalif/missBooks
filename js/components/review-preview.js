
export default {
    props: ['review'],
    template: `
    <div class="review-preview">
        <p class="review-preview-free-txt">{{review.freeTxt}}</p>
        <div class="review-stars-container">
        <div v-for="(index) in review.rate" :key="index"> '🌟'</div>
        </div>
        <h6>{{review.userName}}</h6>
        <button class="delete-review-btn" @click="deleteReview">Delete</button>
    </div>
    `,
    computed: {
    },
    components: {
        
    },
    methods: {
        deleteReview(){
            this.$emit('deleteReview', this.review.id)
        },
    }
}

