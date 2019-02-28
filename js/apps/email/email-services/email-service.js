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
			createEmail('have a nice day', 'hello shuki great to meet you', 'bossit@gmail.com'),
			createEmail('mission accomplished', 'hello muki great to meet you', 'robot@gmail.com')
		];
	}
	gEmails = emails;
	utilService.saveToStorage(EMAILS_KEY, gEmails);

}

function createEmail(subject, body, from) {
	return {
		id: gNextId++,
		subject: subject,
		body: body,
		isRead: false,
		sentAt: new Date().toLocaleString(),
		from: from,
		isStared: false
	}
}

function getEmailsForDisplay() {
	console.log(gEmails);
	return gEmails;
	// if (gMemesFilterBy === 'All') return gImages;
	// return gImages.filter(function (meme) {
	//     if (meme.keywords.find(function (word) { return word === gMemesFilterBy })) return meme;
	// })
}

function allEmails() {
	console.log(gEmails);
	return gEmails;
}

function getEmailById(id) {
	var email = gEmails.find(function (email) {
		return email.id === id;
	});
	return email;
}

//console.log(gEmails);

export default {
	getEmailsForDisplay,
	getEmailById
}