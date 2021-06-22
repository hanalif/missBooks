import bookPrice from "./book-price.js";

export default {
    props: ['book'],
    template: `
    <div class="book-preview">
        <img class="book-preview-img" :src="book.thumbnail" alt="book-cover">
        <p class="book-name" :title="'Book Name: ' + book.title"> {{book.title}}</p>
        <book-price :book="book"/>
    </div>
    `,
    computed: {
    },
    components: {
        bookPrice
    }
}

