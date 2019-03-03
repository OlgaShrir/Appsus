// export default {
//     props: [''],
//     components: {

//     },
//     template: `
//         <section>
//             <form class="keep-form flex column align-center">
//                 <input v-show="isAddingNote" v-model="newNote.noteTitle" 
//                         class="input-add-note-title" type="text" placeholder="Title" style="" />
//                 <input @mouseup="isAddingNote=true" @click="setFocus()" ref="noteinput" v-model="newNote.note" 
//                         class="input-add-note" type="text" placeholder="What's on your mind" style="" />
//                 <div class="edit-new-note flex" v-if="isAddingNote">
//                     <!-- TODO: colors, type, img, todos -->
//                     <!-- <input type="image"> -->
//                     <i class="fas fa-align-left"></i>     <!-- default- input text -->
//                     <i class="fas fa-palette" @click="onChangeColor()"></i>        <!--  input color -->
//                     <i class="far fa-images"></i>         <!--  input image -->
//                     <i class="fas fa-list-ul"></i>        <!--  input todo -->
//                     <i class="far fa-file-audio"></i>     <!--  input audio -->
//                     <i class="fas fa-link"></i>
//                 </div>

//                 <color-note v-if="isChooseColor" @emitColor="getColor($event)">
//                 </color-note>

//                 <div class="save-note">
//                    <button @click="onAddNewNote()">Add Note</button>
//                    <button @click="emptyNewNote()">Delete Note</button>
//                 </div>
//             </form>
//         </section>
//     `,
//     data() {
//         return {

//         }
//     },
//     created() {

//     },
//     methods: {

//     },
// }

