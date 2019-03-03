import keepMain from '../keep-pages/keep-main-cmp.js'
import keepService from '../keep-services/keep-service.js'
import inputLink from '../keep-cmps/keep-link-cmp.js'

export default {
    props: ['note', 'isAddingImage'],
    components: {
        inputLink
    },
    template: `
        <section class="keep-notes-preview">
            <div class="'note-preview' flex column 'justify-between'" :style="bcg">
                <i @click.stop="onDeleteNote()" class="fas fa-trash-alt"></i>
                <span class="note-title">{{note.noteTitle}}</span>
                <span @keyup="restrictNoteLength()" class="note-txt">{{renderingNote}}</span>
                <span v-if="more200" class="read-more">Read more...</span>
                <a :href="note.link" @click.stop="link()" target="_blank">{{note.link}}</a>
                <!-- <img v-if="isAddImage" :src="note.image"> -->
                <img v-if="isAddImage" :src="note.image">
                

            </div>                    
        </section>
    `,
    data() {
        return {
            renderingNote: '',
            more200: false,
            isChooseColor: false,
            bcg: {
                backgroundColor: ''
            },
            isPinned: false,
            isAddImage: false
        }
    },
    created() {
        var note = this.note.note
        var len = note.length
        if (len > 200) {         
            for(var i = 0; i < 200; i++){
                this.renderingNote += note[i];
            } 
            this.renderingNote += '...'
            this.more200 = true;
        } else {
            this.renderingNote = note;
        }

        this.isPinned = this.note.isPinned
        this.bcg.backgroundColor = this.note.color;
        // if (isAddImage){
        //     this.this.isAddImage = this.note.image = this.note.image

        // }
        this.isAddImage = this.note.image
    },
    methods: {
        onDeleteNote() {
            this.$emit('delete', this.note)   // 1. event name 2. whatever i send to daddy
        },
        onOpenNote(){
            this.$emit('open', this.note)
        },
        link(){
            //do not delete the method, it allows to use "stop-propagation" on href!!!           
        }

    },
}


//  // if note's text is more than 200 chars render 200 first chars
//  var note = this.note.note
//  var len = note.length
//  if (len > 200) {         
//      for(var i = 0; i < 200; i++){
//          this.renderingNote += note[i];
//      } 
//      this.renderingNote += '...'
//      this.more200 = true;
//  } else {
//      this.renderingNote = note;
//  }
//  // console.log('this.note.id',this.note.id)
//  this.renderingNote.id = keepService.updateId()