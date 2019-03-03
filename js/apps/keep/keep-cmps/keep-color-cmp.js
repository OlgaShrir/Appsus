export default {
    props: [''],
    components: {

    },
    template: `
        <div class="color" >
            <input class="color-input" type="color" v-model="color" >
            <button class="color-button" @mouseup="getColor()">Choose Color</button>
        </div>
    `,
    data() {
        return {
            color: null
        }
    },
    created() {

    },
    methods: {
        getColor(){
            // console.log(this.color)
            this.$emit('emitColor', this.color)   // 1. event name 2. whatever i send to daddy
        }
    },
    computed: {
        
    },
}

