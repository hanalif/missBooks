export default {
    props: ['txt'],
    template: `
    <div class="long-txt">
       <p>{{txt}}</p>
    </div>
    `,
    methods: {
        back(){
            this.$emit('back')
        }
    }
   
};
