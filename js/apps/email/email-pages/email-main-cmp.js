import emailService from '../email-services/email-service.js';
import emailList from '../email-cmps/email-list-cmp.js';
import emailFilter from '../email-cmps/email-filter-cmp.js';
import {eventBus, EVENT_INBOX,READ_EMAILS} from '../../../services/eventbus-service.js';
import composeEmail from '../email-cmps/compose-email-cmp.js';


export default {
    // <button v-on:click="toggleDetails">Toggle Details</button>
    //     <div v-if="shouldShowDetails">

     template: `
        <section class="main-email flex ">
            <div class="left flex column align-center">
                <button @click="toggleShowEmail" class="compose">+ compose</button>
                <button @click="filterNull">
                    inbox
                </button> 
                <div>
                    sent
                </div> 
                <div @click="showUnred">
                    unread emails
                </div> 
                <div @click="showRead">
                    read emails
                </div> 
                
            </div> 
            <div class="right flex column">
            <div class="flex search-area"> 
            <email-filter @filtered="setFilter"></email-filter>  
                
           </div> 
                <email-list v-bind:emails="emailsToShow" ></email-list>
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
                subject: ''
            },
            showComposeEmail:false
        }
    },
    methods: {
        showRead() {
            console.log('read')
        },
        showUnred() {
            console.log('unread')
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        filterNull(){
            var temp = ''
            //console.log('was clicked')
            eventBus.$emit(EVENT_INBOX,temp)
        },
        toggleShowEmail(ev) {
         console.log('TOGGLE EV', ev);
            this.showComposeEmail = !this.showComposeEmail;
        },
    },

    created() {
        emailService.getEmailsForDisplay()
        //console.log('test', emailService.getEmailsForDisplay())
            .then(emails => this.emails = emails)
    eventBus.$on(READ_EMAILS, temp=>{
        console.log ('check', temp)
    } )
    },

    components: {
        emailList,
        emailFilter,
        composeEmail
    },

    computed: {
        emailsToShow() {
            return this.emails.filter(email => email.subject.includes(this.filterBy.subject) ||
                email.body.includes(this.filterBy.subject)
            )
        }
    }
}  