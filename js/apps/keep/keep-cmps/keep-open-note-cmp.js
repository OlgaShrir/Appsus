
import keepService from '../keep-services/keep-service.js'

export default {
    props: ['note'],
    components: {

    },
    template: `
        <div v-if="isOpen">
            <textarea  class="textarea-open" v-model="newValue.noteTitle"></textarea>
            <textarea class="textarea-open" v-model="newValue.note"></textarea>
            <button @click="saveEdit()">Save</button>
        </div>
    `,
    data() {
        return {
            id: null,
            newValue: {title:'',
                       note:''},
            isOpen: true
        }
    },
    created() {
        this.newValue = {...this.note}
        // this.isOpen = true
    },
    methods: {
        saveEdit(){
            var notes = keepService.saveEdit(this.newValue)
            this.$emit('editedNotes', notes)
            this.isOpen = !this.isOpen
        }
    },
    computed: {  
    }
}
