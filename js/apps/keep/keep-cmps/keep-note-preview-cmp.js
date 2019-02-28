import keepMain from '../keep-pages/keep-main-cmp.js'
import keepService from '../keep-services/keep-service.js'

export default {
    props: ['note'],
    components: {

    },
    template: `
        <section class="keep-notes-preview ">
            <div class="note-preview flex column justify-between" @click="onOpenNote()" >
                <i @click="onDeleteNote()" class="fas fa-trash-alt"></i>
                <span class="note-title">{{note.noteTitle}}</span>
                <span @keyup="restrictNoteLength()" class="note-txt">{{renderingNote}}</span>
                <span v-if="more200" class="read-more">Read more...</span>
            </div>
        </section>
    `,
    data() {
        return {
            renderingNote: '',
            more200: false,
        }
    },
    created() {
        // // if note's text is more than 200 chars render 200 first chars
        // var note = this.note
        // // console.log('this.note',this.note)
        // var noteTxt = this.note.note
        // var len = noteTxt.length
        // if (len > 200) {         
        //     for(var i = 0; i < 200; i++){
        //         this.renderingNote += noteTxt[i];
        //     } 
        //     this.renderingNote += '...'
        //     this.more200 = true;
        // } else {
        //     this.renderingNote = noteTxt;
        // }
        // console.log('this.note.id',this.note.id)
        // this.note.id = keepService.updateId()

        // console.log('this.note',this.note)
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
    },
    methods: {
        onDeleteNote() {
            this.$emit('delete', this.note)   // 1. event name 2. whatever i send to daddy
        },
        onOpenNote(){
            this.$emit('open', this.note)
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