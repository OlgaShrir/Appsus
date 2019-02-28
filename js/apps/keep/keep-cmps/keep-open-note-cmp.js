import keepMain from '../keep-pages/keep-main-cmp.js'
import keepService from '../keep-services/keep-service.js'
// import {eventBus, EVENT_TEST} from './services/eventbus-service.js'

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
        }
    },
    created() {
        // console.log('note text:', this.note)
    },
    methods: {
        
    },
}
