import { booksService } from "../service/books-service.js";
import bookList from '../components/book-list.js';
import bookFilter from '../components/book-filter.js';
import bookAdd from "../components/book-add.js";


export default {
    template: `
        <section class="book-app">
            <book-add @addNewBook="onBookAdded"/>
            <book-filter @filtered="setFilter"/>
            <book-list :books="booksToShow" />
            
        </section>
    `,
    data() {
        return {
            books: [],
            filterBy: null
            
        };
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        onBookAdded(newBook){
            booksService.save(newBook).then(()=>{
                booksService.query()
             .then(books => this.books = books)
            });   
        }
    },
    computed: {
        booksToShow() {
      if (
        !this.filterBy ||
        (this.filterBy.title === '' &&
          this.filterBy.fromPrice === '' &&
          this.filterBy.toPrice === '')
      )
        return this.books;

      if (this.filterBy.fromPrice === '') this.filterBy.fromPrice = 0;
      if (this.filterBy.toPrice === '') this.filterBy.toPrice = Infinity;

      const searchStr = this.filterBy.title.toLowerCase();
      const booksToShow = this.books.filter((book) => {
        return (
          book.title.toLowerCase().includes(searchStr) &&
          book.listPrice.amount >= this.filterBy.fromPrice &&
          book.listPrice.amount < this.filterBy.toPrice
        );
      });
      return booksToShow;
        }
    },
    created(){
        booksService.query()
            .then(books => this.books = books)
    },
    components: {
        bookList,
        bookFilter,
        bookAdd
    }
};

