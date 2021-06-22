export default{
    template: `
    <section class="book-filter">
    <div class="book-filter-container main-layout">
    <h1 class="book-preview-title">Our Books</h1>
    <div class="search-container">
    <input v-model="filterBy.title" type="text" @input="filter" placeholder="Search...">
    <input v-model.number="filterBy.fromPrice" type="number" @input="filter" placeholder="from price...">
    <input v-model.number="filterBy.toPrice" type="number" @input="filter" placeholder="to price..."> 
    </div>
    </div>
    
    </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: 0,
            toPrice: Infinity
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', {...this.filterBy });
        }
    }
};
