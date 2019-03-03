import emailService from '../email-services/email-service.js';
import emailList from '../email-cmps/email-list-cmp.js';
import emailFilter from '../email-cmps/email-filter-cmp.js';
import { eventBus, EVENT_INBOX, READ_EMAILS } from '../../../services/eventbus-service.js';
import composeEmail from '../email-cmps/compose-email-cmp.js';


export default {

    template: `
        <section class="main-email flex wrapper ">
            
            <div class="left flex column align-center">
                <button @click="toggleShowEmail" class="compose">+ compose</button>
                <div  class="cursor" @click="filterNull">
                    inbox
                </div> 
                <div class="cursor">
                    sent
                </div> 
                <div class="cursor"@click="showUnread">
                    unread emails {{countUnRead}}
                </div> 
                <div class="cursor" @click="showRead">
                    read emails {{countRead}}
                </div> 
            </div> 
            <div class="right flex column">
           
                <div class="flex search-area"> 
                    <email-filter @filtered="setFilter"></email-filter>  
                </div>
                <router-link  exact to="/email/email-list"></router-link> 
                <router-view 
                    :filtered="emailsToShow"
                    @deleted="getEmails">
                </router-view> 
            </div>  
            
            <compose-email  v-if="showComposeEmail" class="compose-email-open compose-email"
                @closeComposeEmail="toggleShowEmail"></compose-email> 
          
        </section>
    `,
    data() {
        return {
            emails: [],
            selectedEmail: null,
            filterBy: {
                subject: '',
                isRead: 'all'
            },
            showComposeEmail: false,

        }
    },
    methods: {
        showRead() {
            this.filterBy.isRead = true;
            console.log('read')
        },
        showUnread() {
            this.filterBy.isRead = false;
            console.log('unread')
        },
        setFilter(filterBy) {
            this.filterBy.subject = filterBy;
            console.log( this.filterBy)

        },
        filterNull() {
            this.filterBy.isRead='all'
            this.filterBy.subject=''
            this.$router.push('/email/email-list')
            var temp = ''
            // //console.log('was clicked')
             eventBus.$emit(EVENT_INBOX, temp)
        },
        toggleShowEmail(ev) {
            console.log('TOGGLE EV', ev);
            this.showComposeEmail = !this.showComposeEmail;
        },
        getEmails() {
            emailService.getEmailsForDisplay()
                .then(emails => this.emails = emails)
        }
    },

    created() {
        this.$router.push('/email/email-list')
        console.log('filter', this.filterBy)
        // console.log('test', emailService.getEmailsForDisplay())
        emailService.getEmailsForDisplay()
            .then(emails => {
                //console.log(emails)
                this.emails = emails
            })
        eventBus.$on(READ_EMAILS, temp => {
            console.log('check', temp)
        })
    },

    components: {
        emailList,
        emailFilter,
        composeEmail
    },

    computed: {

        emailsToShow() {
            return this.emails.filter(email => email.subject.includes(this.filterBy.subject) || email.body.includes(this.filterBy.subject))
            .filter(email=> {
                if (this.filterBy.isRead === 'all') return email;
                else if (this.filterBy.isRead) return email.isRead;
                else return !email.isRead;
            })
            // if (this.filterBy.subject === '' && this.filterBy.isRead === 'all') {
            //     return this.emails
            // }
            // else if ((this.filterBy.subject !== '') && (this.filterBy.isRead === 'all')) {
            //     return this.emails.filter(email => email.subject.includes(this.filterBy.subject) || email.body.includes(this.filterBy.subject))
            // }
            // else if (this.filterBy.subject === '' && this.filterBy.isRead !== 'all') {
            //     return this.emails.filter(email => { email.isRead === this.filterBy.isRead })
            // }
            // else if (this.filterBy.subject !== '' && this.filterBy.isRead !== 'all') {
            //     return this.emails.filter(email => {
            //         (email.subject.includes(this.filterBy.subject) || email.body.includes(this.filterBy.subject))
            //             && (email.isRead===this.filterBy.isRead)
            //     }

            //     )
            // }
        },


        countRead() {
            var readEmails = this.emails.filter(function (email) {
                return email.isRead === true
            });
            //console.log ('read',readEmails);
            return readEmails.length;

        },
        countUnRead() {
            var readEmails = this.emails.filter(function (email) {
                return email.isRead === false
            });
            //console.log ('read',readEmails);
            return readEmails.length;

        }
    }
}  