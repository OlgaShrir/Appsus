import keepService from '../keep-services/keep-service.js'
import notePreview from '../keep-cmps/keep-note-preview-cmp.js'
import openNote from '../keep-cmps/keep-open-note-cmp.js'
import colorNote from '../keep-cmps/keep-color-cmp.js'


export default {
    components: {
        notePreview,
        openNote,
        colorNote, 
        
    },
    template: `
       <section class="main-keep">

        <!-- <input-form></input-form> -->

        <form class="keep-form flex column align-center">
                <input v-show="isAddingNote" 
                       v-model="newNote.noteTitle" 
                       class="input-add-note-title" 
                       type="text" 
                       placeholder="Title" 
                       style="" />
                <input @mouseup="isAddingNote=true" 
                       @click="setFocus()" 
                       ref="noteinput" 
                       v-model="newNote.note" 
                       class="input-add-note" 
                       type="text" 
                       placeholder="What's on your mind" 
                       style="" />
                <input type="text" class="input-add-link" v-if="isAddingLink" v-model="newNote.link" placeholder="Add link">
                <input type="text" class="input-add-image" v-if="isAddingImage" v-model="newNote.image" placeholder="Add image url">


                <div class="edit-new-note flex" v-if="isAddingNote">
                    <i class="fas fa-align-left icon"></i>     <!-- default- input text -->
                    <i class="fas fa-thumbtack icon" @click="onPinNote()"></i>      <!--  pinned note -->
                    <i class="fas fa-palette icon" @click="onChangeColor()"></i>        <!--  input color -->
                    <i class="far fa-images icon" @click="onAddImage()"></i>         <!--  input image -->
                    <i class="fas fa-link icon" @click="onAddLink()"></i>
                </div>

                <color-note v-if="isChooseColor" @emitColor="getColor($event)">
                </color-note>  

                <div class="save-note">
                   <button @click="onAddNewNote()">Add Note</button>
                   <button @click="emptyNewNote()">Cancel</button>
                </div>
            </form>
      

            <!-- preview note for edit or full view -->
            <div class="open-note flex column" v-if="isNoteOpen">
                <i class="far fa-window-close" @click="isNoteOpen=!isNoteOpen"></i>
                <open-note class="open-note-cmp" @editedNotes="notesToDisplay" :note="currNote"></open-note>
            </div>


            <!-- render notes -->
            <!-- TODO: dynamic components -->
            <div class="flex column" >
                <span class="pinned-other">Pinned:</span>              
                <div class="notes-grid flex column-reverse">                  
                    <note-preview v-for="note in notes"  
                        :key="note.id" 
                        v-if="note.isPinned"
                        @delete="onDeleteNote(note)" 
                        :note="note" 
                        :isAddiImage="isAddingImage" 
                        @click.native="updateCurr(note)" 
                        :color="newNote.color">
                    </note-preview>  
                </div>
                <hr />
                <span class="pinned-other">Other:</span>
                <div class="notes-grid flex column-reverse">             
                    <note-preview v-for="note in notes"  
                        :key="note.id" 
                        v-if="!note.isPinned"
                        @delete="onDeleteNote(note)" 
                        :note="note" 
                        :isAddiImage="isAddingImage" 
                        @click.native="updateCurr(note)" 
                        :color="newNote.color">
                    </note-preview>   
                </div>           
            </div>
            <div>
               
            </div>
       </section>
    `,

    data() {
        return {
            newNote: {
                id: null,
                note: '',
                noteTitle: '',
                isPinned: false,
                createTime: null,
                type: null,   //note, video, audio, todo
                color: null, 
                link: null,
                image: null
            },
            notes: null,
            isNoteOpen: false,
            currNote: null,
            editedNote: null,
            isChooseColor: false,
            isAddingNote: false,
            isAddingLink: false,
            isAddingImage: false
        }
    },
    methods: {
        notesToDisplay(){
            this.notes = keepService.getStoragedNotes()
            this.isNoteOpen = !this.isNoteOpen
        },
        updateCurr(note) {
            this.currNote = note;
            this.isNoteOpen = true;
        },
        onAddNewNote() {
            if (!this.newNote.note && 
                !this.newNote.noteTitle &&
                !this.newNote.link &&
                !this.newNote.image 
                ) return
            keepService.addNewNote(this.newNote)
                .then(notes => this.notes = notes)
            this.isAddingNote = false
            this.isChooseColor = false
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
                color: null,
                link: null,
                image: null
            }
            this.isAddingNote = false
            this.isAddingLink = false
            this.isAddingImage = false
        },
        onDeleteNote(note) {
            this.notes = keepService.deleteNote(note);
        },
        onSaveEdit(currNote) {
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
        },
        onPinNote(){
            this.newNote.isPinned = true
        },
        onAddLink(){
            this.isAddingLink = true
        },
        onAddImage(){
            this.isAddingImage = true
        }
    },
    created() {
        this.notes = keepService.getStoragedNotes();
    },
    computed:{
       
    }
}



// input forms

        //    <form class="keep-form flex column align-center">
        //        <input v-show="isAddingNote" v-model="newNote.noteTitle" 
        //                 class="input-add-note-title" type="text" placeholder="Title" style="" />
        //        <input @mouseup="isAddingNote=true" @click="setFocus()" ref="noteinput" v-model="newNote.note" 
        //                 class="input-add-note" type="text" placeholder="What's on your mind" style="" />
        //        <div class="edit-new-note flex" v-if="isAddingNote">
        //             <!-- TODO: colors, type, img, todos -->
        //             <!-- <input type="image"> -->
        //             <i class="fas fa-align-left"></i>     <!-- default- input text -->
        //             <i class="fas fa-palette" @click="onChangeColor()"></i>        <!--  input color -->
        //             <i class="far fa-images"></i>         <!--  input image -->
        //             <i class="fas fa-list-ul"></i>        <!--  input todo -->
        //             <i class="far fa-file-audio"></i>     <!--  input audio -->
        //             <i class="fas fa-link"></i>
        //         </div>

        //         <color-note v-if="isChooseColor" @emitColor="getColor($event)">
        //         </color-note>

        //         <div class="save-note">
        //            <button @click="onAddNewNote()">Add Note</button>
        //            <button @click="emptyNewNote()">Delete Note</button>
        //         </div>
            // </form>
