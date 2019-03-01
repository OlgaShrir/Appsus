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
		sentAt: new Date(),//.toLocaleDateString(),
		from: from,
		to: to,
		isStared: false
	}
}

function getEmailsForDisplay() {
	console.log(gEmails);
	return Promise.resolve(gEmails);
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
		return email.id == id;
	});
	return Promise.resolve(email);
}

function saveNewEmail(subject, body, from, to) {
	var newEmail = createEmail(subject, body, from, to);
	gEmails.push(newEmail);
	utilService.saveToStorage(EMAILS_KEY, gEmails);
}

export default {
	getEmailsForDisplay,
	getEmailById,
	saveNewEmail
}