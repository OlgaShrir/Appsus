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

       <!-- input forms -->
           <form class="keep-form flex column align-center">
               <input v-show="isAddingNote" v-model="newNote.noteTitle" 
                        class="input-add-note-title" type="text" placeholder="Title" style="" />
               <input @mouseup="isAddingNote=true" @click="setFocus()" ref="noteinput" v-model="newNote.note" 
                        class="input-add-note" type="text" placeholder="What's on your mind" style="" />
               <div class="edit-new-note flex" v-if="isAddingNote">
                    <!-- TODO: colors, type, img, todos -->
                    <i class="fas fa-align-left"></i>   
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

            <!-- preview note for edit or full view -->
            <!-- TODO: new component -->
            <div class="open-note flex column" v-if="isNoteOpen">
                <i class="far fa-window-close" @click="isNoteOpen=!isNoteOpen"></i>
                <open-note class="open-note-cmp" :note="currNote"></open-note>
                <!-- <button @click=onSaveEdit(currNote) class="save-note">Save</button> -->
            </div>

            <!-- render notes -->
            <div class="notes-grid flex column-reverse" >
                <note-preview v-for="note in notes"  :key="note.id" 
                    @delete="onDeleteNote(note)" :note="note" @click.native="updateCurr(note)">
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
                id: null,
                note: '',
                noteTitle: '',
                isPinned: false,
                createTime: null,
                backGroundColor: null,
                type: null    //note, video, audio, todo
            }, 
            notes: null,
            isNoteOpen: false,
            currNote: null,
            editedNote: null
        } 
    },
    methods:{
        updateCurr(note){     
            this.currNote = note;
            this.isNoteOpen = true;
        },
        onAddNewNote(){
            if(!this.newNote.note && !this.newNote.noteTitle) return
            
            // console.log('this.newNote',this.newNote)
            // // this.newNote.id = keepService.updateId() // Cannot set property 'id' of null"
            keepService.addNewNote(this.newNote)
            .then (notes => this.notes = notes)
            this.isAddingNote = false
            
            // console.log(this.id)
            // console.log(this.note)
            this.emptyNewNote()
        },
        emptyNewNote(){
                        this.newNote = {
                            id: null,
                            note: '',
                            noteTitle: '',
                            isPinned: false,
                            createTime: null,
                            backGroundColor: null,
                            type: null    //note, video, audio, todo
                        }
                        this.isAddingNote = false
        },
        onDeleteNote(note){
            this.notes = keepService.deleteNote(note);
        },
        onSaveEdit(currNote){
            // console.log(currNote)
            keepService.saveEdit(currNote)
        },
        setFocus(){
            this.$refs.noteinput.focus();
        }
    },
    created(){
        this.notes = keepService.getStoragedNotes();
        // console.log(this.notes)
    },
}
