import keepService from '../keep-services/keep-service.js'
import notePreview from '../keep-cmps/keep-note-preview-cmp.js'
import openNote from '../keep-cmps/keep-open-note-cmp.js'

export default {
    components: {
        notePreview,
        openNote
    }, 
    template: `
       <section class="main-keep">

           <form class="keep-form flex column align-center">
               <input v-if="isAddingNote" v-model="newNote.noteTitle" 
                        class="input-add-note-title" type="text" placeholder="Title" style="" />
               <input @mouseup="isAddingNote=true" v-model="newNote.note" 
                        class="input-add-note" type="text" placeholder="What's on your mind" style="" />
               <div class="edit-new-note flex" v-if="isAddingNote">
                    <!-- TODO: colors, type, img, todos -->
                    <i class="fas fa-align-justify"></i>
                    <i class="fas fa-palette"></i>
                    <i class="far fa-images"></i>
                    <i class="fas fa-list-ul"></i>
                    <i class="far fa-file-audio"></i>
                    <i class="fas fa-link"></i>
               </div>
               <div class="save-note">
                   <button @click="onAddNewNote()">Add Note</button>
                   <button @click="emptyNewNote()">Delete Note</button>
               </div>

            </form>


            <open-note class="open-note" v-if="isNoteOpen" :note="currNote"></open-note>


            <div class="notes-grid">
                <note-preview v-for="note in notes" :key="note.id" 
                @delete="deleteNote(note)" :note="note" @click.native="updateCurr(note)" >
                </note-preview>
               
            </div>
            <div>
               
            </div>
       </section>
    `,

// @open="openNote()"
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
            notes: null,
            isNoteOpen: false,
            currNote:null
            
        } 
    },
    methods:{
        updateCurr(note){
            this.currNote = note;
            this.isNoteOpen = true;
            // console.log('updateCurr',this.currNote)
        },
        onAddNewNote(){
            if(!this.newNote.note && !this.newNote.noteTitle) return
            keepService.addNewNote(this.newNote)
            .then (notes => this.notes = notes)
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
                        this.isAddingNote = false
        },
        deleteNote(note){
            this.notes = keepService.deleteNote(note);
        },
        openNote(){
            // console.log('I\'m in main')
            // console.log('this.currNote:', this.currNote)

            // this.isNoteOpen = !this.isNoteOpen
            // this.isNoteOpen = true
        }
    },
    created(){
        this.notes = keepService.getStoragedNotes();
        // console.log(this.notes)
    },
}
