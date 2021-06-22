import { booksService } from "../service/books-service.js";

export default{
    template: `
    <section class="book-add">
        <div class="book-app-search-container main-layout">
            <input v-model="bookSearch" type="text" @input="searchBook" placeholder="Search book...">
        </div>
        <ul class="books-search-list main-layout">
            <li v-for="item in items" :key="item.id">
                {{item.volumeInfo.title}}
                <button @click="addItem(item)">+</button>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
            bookSearch: null,
            items: []
        };
    },
    methods: {
        searchBook() {
            booksService.getGoogleBooks(this.bookSearch)
                .then(res =>{
                    this.items = res.items
                });
        },
        addItem(item){
            const newBook = {
                id: item.id,
                title: item.volumeInfo.title,
                subtitle: item.volumeInfo.subtitle,
                authors: item.volumeInfo.authors,
                publishedDate: item.volumeInfo.publishedDate,
                description: item.volumeInfo.description,
                pageCount: item.volumeInfo.pageCount,
                categories: item.volumeInfo.categories,
                thumbnail: item.volumeInfo.imageLinks.thumbnail,
                language: item.volumeInfo.language,
                listPrice: {
                    amount:(item.volumeInfo.pageCount)? item.volumeInfo.pageCount: 150,
                    currencyCode: 'EUR',
                    isOnSale: true,
                }
            }
            this.bookSearch = '';
            this.items = [];

            this.$emit('addNewBook', newBook );
            
        }
    }
};

