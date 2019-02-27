import keepService from '../keep-services/keep-service.js'
import notePreview from '../keep-cmps/keep-note-preview-cmp.js'

export default {
    components: {
        notePreview
    }, 
    template: `
       <section class="main-keep">

           <form class="keep-form flex column align-center">
               <input v-if="isAddingNote" v-model="newNote.noteTitle" 
                        class="input-add-note-title" type="text" placeholder="Title" style="width:500px" />
               <input @mouseup="isAddingNote=!isAddingNote" v-model="newNote.note" 
                        class="input-add-note" type="text" placeholder="What's on your mind" style="width:500px" />
               <div class="edit-add-note">
                    <!-- TODO: colors, type, img, todos -->
               </div>
               <div class="save-note">
                   <button @click="onAddNewNote()">Add Note</button>
               </div>

            </form>
            <note-preview v-for="note in notes" :key="note.id" :note="note">

            </note-preview>

       </section>
    `,
    data() {
        return {
            isAddingNote: false,
            newNote: {
                note: '',
                noteTitle: '',
                isPinned: false,
                createTime: null,
                backGroundColor: null,
                type: null    //note, video, audio, todo
            }, 
            notes: null
            
        } 
    },
    methods:{
        onAddNewNote(){
            var notes = keepService.addNewNote(this.newNote)
            this.notes = notes
            this.isAddingNote = false
            this.emptyNewNote()
        },
        emptyNewNote(){
                        this.newNote = {
                            note: '',
                            noteTitle: '',
                            isPinned: false,
                            createTime: null,
                            backGroundColor: null,
                            type: null    //note, video, audio, todo
                        }
        }
    },
    name: "keep-main"
}
