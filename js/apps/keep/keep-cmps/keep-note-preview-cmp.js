import keepMain from '../keep-pages/keep-main-cmp.js'

export default {
    props: ['note'],
    components: {

    },
    template: `
        <section class="keep-notes-preview flex column align-center">
            <div class="note-preview ">
                <p class="note-title">{{note.noteTitle}}</p>
                <p class="note-txt">{{note.note}}</p>
            </div>
            
        </section>
    `,
    data() {
        return {}
    },
    methods: {

    },
}
