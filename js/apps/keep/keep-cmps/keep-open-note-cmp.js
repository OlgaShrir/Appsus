import keepMain from '../keep-pages/keep-main-cmp.js'
import keepService from '../keep-services/keep-service.js'

export default {
    props: ['note'],
    components: {

    },
    template: `
        <div>
            <textarea class="textarea-open" :value="note.note"></textarea>
        </div>
    `,
    data() {
        return {
            id: null
        }
    },
    created() {
        this.id = this.note.id
        console.log('this.note.id:', this.note.id)
    },
    methods: {
        
    },
    computed: {

        
    }
}
