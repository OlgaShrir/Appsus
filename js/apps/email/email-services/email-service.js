import utilService from '../../../services/utils-service.js'


var gNextId = 1;
var gEmails;
const EMAILS_KEY = 'emails';

createEmails();


function createEmails() {
	var emails = utilService.loadFromStorage(EMAILS_KEY);
	if (!emails || emails.length === 0) {
		emails = [
			createEmail('welcome', 'hello puki great to meet you', 'boss@gmail.com'),
			createEmail('have a nice day', 'welcome shuki great to meet you', 'bossit@gmail.com'),
			createEmail('mission accomplished', 'hello muki great to meet you', 'robot@gmail.com')
		];
	}
	else {
	    gNextId = findNextId(emails);
	}
	gEmails = emails;
	utilService.saveToStorage(EMAILS_KEY, gEmails);
}

function findNextId(emails) {
	var max = 0;
	emails.forEach(function (email) {
			if (email.id > max) max = email.id;
	})
	return max + 1;
}

function createEmail(subject, body, from, to = null) {
	return {
		id: gNextId++,
		subject: subject,
		body: body,
		isRead: false,
		sentAt: new Date().toLocaleDateString(),
		from: from,
		to: to,
		isStared: false
	}
}

function getEmailsForDisplay() {
	console.log( 'getemails', gEmails);
	return Promise.resolve(gEmails);
}

function allEmails() {
	console.log(gEmails);
	return gEmails;
}

function getEmailById(id) {
	var email = gEmails.find(function (email) {
		return email.id == id;
	});
	return Promise.resolve(email);
}

function saveNewEmail(subject, body, from, to) {
	var newEmail = createEmail(subject, body, from, to);
	gEmails.push(newEmail);
	utilService.saveToStorage(EMAILS_KEY, gEmails);
}

function updateAsRead(id){
	console.log('read true')
	getEmailById(id)
	.then (email=> email.isRead=true)
	.then (()=>utilService.saveToStorage(EMAILS_KEY, gEmails))
	

}
 function updateAsUnread(id){
	 console.log('read false')
	 getEmailById(id)
	 .then (email=> email.isRead=false)
	 .then (()=>utilService.saveToStorage(EMAILS_KEY, gEmails))
	 
 }

 function deleteEmail(id){
	 console.log('delete')
	 var indx = gEmails.findIndex(function (email) {
		return email.id === id
	 })
	gEmails.splice(indx, 1);
	utilService.saveToStorage(EMAILS_KEY, gEmails);
 }

 function getReadEmails(){
	 var readEmails=gEmails.filter(function (email) {
		return email.isRead===true});
		console.log ('read',readEmails);
		return readEmails;
	 }

	 function getUnReadEmails(){
		var readEmails=gEmails.filter(function (email) {
		 return email.isRead===false})
		}


export default {
	getEmailsForDisplay,
	getEmailById,
	saveNewEmail,
	updateAsUnread,
	updateAsRead,
	deleteEmail,
	getReadEmails,
	getUnReadEmails
}