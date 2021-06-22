export default {
    template: `
    <div class="star-raiting">
     <div v-for="(star, index) in starsArr" :key="index" @click="onRate(index + 1)">
     {{numOfStarSelected >= (index + 1) ? '🌟': '⭐'}}
     </div>
    
    </div>
    `,
    data(){
        return{
            starsArr: null,
            numOfStarSelected: 0
        }
    },
    methods: {
        onRate(num){
            this.numOfStarSelected = num;
            this.$emit('rate', num); 

        }
    },
    created(){
        this.starsArr = new Array(5);
    }
};
