import keepMain from '../keep-pages/keep-main-cmp.js'
import utilService from '../../../services/utils-service.js'
import notePreview from '../keep-cmps/keep-note-preview-cmp.js'

const NOTES_KEY = 'notes';
const ID_KEY = 'note-id'

export default{
    addNewNote,
    getStoragedNotes,
    deleteNote,
    updateId,
    saveEdit
}

var gNotes = [];
var gId = 0;

function addNewNote(note){

    gNotes = getStoragedNotes();
    if (gNotes === null) gNotes = [];

    note.id = updateId();
    gNotes.push(note);
    // console.log(gNotes)

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

function saveEdit(currNote){
    var id = currNote.id
    console.log('currNote',currNote)
    gNotes = getStoragedNotes();
    console.log('gNotes',gNotes)
    // ID!!!!!!!!!!
    gNotes.forEach(note => {
        if(note.id === id){
            console.log('Match! id=', id)
            note.note= currNote.note
            note.noteTitle= currNote.noteTitle
            note.isPinned= currNote.isPinned
            note.backGroundColor= currNote.backGroundColor
            note.type= currNote.type  
        }
    })
    console.log('gNotes',gNotes)

}

function updateId(){
    gId = utilService.loadFromStorage(ID_KEY)
    if( !gId) utilService.saveToStorage(ID_KEY,0)
    gId++
    // console.log('gId',gId)
    utilService.saveToStorage(ID_KEY,gId)
    return gId;
}