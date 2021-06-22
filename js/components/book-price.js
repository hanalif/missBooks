export default {
    props: ['book'],
    template: `
    <div class="book-price">
        <p :class="{ 'high-price': isPriceHigh, 'low-price': isPriceLow}"> {{book.listPrice.amount}}{{currencyIcon}}</p>
    </div>
    `,
    computed: {
        isPriceHigh(){
            return this.book.listPrice.amount > 150;
        },
        isPriceLow(){
            return this.book.listPrice.amount < 20;
        },
        currencyIcon(){
            let currencyCode = this.book.listPrice.currencyCode;
            switch (currencyCode) {
                case 'ILS': return '₪' 
                    break;
                 case 'EUR': return '€' 
                    break;
                 case 'USD': return '$' 
                    break;
            }
         }
    }
};
