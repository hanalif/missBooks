import bookPreview from "./book-preview.js";


export default {
    props: ['books'],
    template: `
    <section class="book-preview-container">
        <div class="book-preview-wrapper main-layout">
            <ul class="book-list">
                 <li v-for="book in books" class="book-container" :key="book.id">
                        <book-preview :book="book" @click.native="select(book)" />
                        <router-link class="book-btn" :to="'/book/'+book.id">Details</router-link>
                </li>
            </ul>
        </div>  
    </section>
    
    `,
    methods: {
        select(book) {
            this.$emit('selected', book);
        }
        
    },
    components: {
        bookPreview,
        
    }

};

