import keepService from '../keep-services/keep-service.js'
import notePreview from '../keep-cmps/keep-note-preview-cmp.js'
import openNote from '../keep-cmps/keep-open-note-cmp.js'
import colorNote from '../keep-cmps/keep-color-cmp.js'

export default {
    components: {
        notePreview,
        openNote,
        colorNote
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
                    <!-- <input type="image"> -->
                    <i class="fas fa-align-left"></i>     <!-- default- input text -->
                    <i class="fas fa-palette" @click="onChangeColor()"></i>        <!--  input color -->
                    <i class="far fa-images"></i>         <!--  input image -->
                    <i class="fas fa-list-ul"></i>        <!--  input todo -->
                    <i class="far fa-file-audio"></i>     <!--  input audio -->
                    <i class="fas fa-link"></i>
                </div>

                <color-note v-if="isChooseColor" @emitColor="getColor($event)">
                </color-note>

                <div class="save-note">
                   <button @click="onAddNewNote()">Add Note</button>
                   <button @click="emptyNewNote()">Delete Note</button>
                </div>
            </form>
            
<!-- </form> -->

            <!-- preview note for edit or full view -->
            <!-- TODO: new component -->
            <div class="open-note flex column" v-if="isNoteOpen">
                <i class="far fa-window-close" @click="isNoteOpen=!isNoteOpen"></i>
                <open-note class="open-note-cmp" :note="currNote"></open-note>
                <!-- <button @click=onSaveEdit(currNote) class="save-note">Save</button> -->
            </div>


            <!-- render notes -->
            <!-- dynamic components -->
            <div class="notes-grid flex column-reverse" >
                <note-preview v-for="note in notes"  :key="note.id" 
                    @delete="onDeleteNote(note)" :note="note" @click.native="updateCurr(note)" :color="newNote.color">
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
                type: null,   //note, video, audio, todo
                color: null
            },
            notes: null,
            isNoteOpen: false,
            currNote: null,
            editedNote: null,
            isChooseColor: false
        }
    },
    methods: {
        updateCurr(note) {
            this.currNote = note;
            this.isNoteOpen = true;
        },
        onAddNewNote() {
            if (!this.newNote.note && !this.newNote.noteTitle) return
            console.log('this.newNote',this.newNote)
            keepService.addNewNote(this.newNote)
                .then(notes => this.notes = notes)
            this.isAddingNote = false
            this.emptyNewNote()
        },
        emptyNewNote() {
            this.newNote = {
                id: null,
                note: '',
                noteTitle: '',
                isPinned: false,
                createTime: null,
                type: null,    //note, video, audio, todo
                color: null
            }
            this.isAddingNote = false
        },
        onDeleteNote(note) {
            this.notes = keepService.deleteNote(note);
        },
        onSaveEdit(currNote) {
            // console.log(currNote)
            keepService.saveEdit(currNote)
        },
        setFocus() {
            this.$refs.noteinput.focus();
        },
        onChangeColor() {
            this.isChooseColor = !this.isChooseColor
        },
        getColor(color) {
            this.newNote.color = color
            console.log(this.newNote.color)
        }
    },
    created() {
        this.notes = keepService.getStoragedNotes();
        // console.log(this.notes)
    },
}
