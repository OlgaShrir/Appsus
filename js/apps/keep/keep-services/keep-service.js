import keepMain from '../keep-pages/keep-main-cmp.js'
import utilService from '../../../services/utils-service.js'
import notePreview from '../keep-cmps/keep-note-preview-cmp.js'

const NOTES_KEY = 'notes';

export default{
    addNewNote,
    getStoragedNotes,
    deleteNote,
}

var gNotes = [];

function addNewNote(note){

    gNotes = getStoragedNotes();
    if (gNotes === null) gNotes = [];

    gNotes.push(note);

    utilService.saveToStorage(NOTES_KEY, gNotes);
    return Promise.resolve(gNotes);
}

function getStoragedNotes(){
    var a = utilService.loadFromStorage(NOTES_KEY)

    return a;
}

function deleteNote(note){
    gNotes = getStoragedNotes();

    var notes = [];
 
    gNotes.forEach(gNote => {
        if(gNote.note !== note.note ) {
            notes.push(gNote)
        }
    });

    utilService.saveToStorage(NOTES_KEY, notes);

    return notes;
}