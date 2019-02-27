import keepMain from '../keep-pages/keep-main-cmp.js'

export default{
    addNewNote
}

var gNotes = [];

function addNewNote(note){
    gNotes.push(note)
    return gNotes;
}