import emailService from '../email-services/email-service.js';
import emailList from '../email-cmps/email-list-cmp.js';
import emailFilter from '../email-cmps/email-filter-cmp.js';
import {eventBus, EVENT_FEEDBACK} from '../../../services/eventbus-service.js';

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
            <div v-if="showComposeEmail" class="compose-email compose-email-open">dssd</div> 
       
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
            console.log('was clicked')
            eventBus.$emit(EVENT_FEEDBACK,temp)
        },
        toggleShowEmail(ev) {
         console.log('TOGGLE EV', ev);
            this.showComposeEmail = !this.showComposeEmail;
        },
    },

    created() {
        emailService.getEmailsForDisplay()
            .then(emails => this.emails = emails)
    },

    components: {
        emailList,
        emailFilter
    },

    computed: {
        emailsToShow() {
            return this.emails.filter(email => email.subject.includes(this.filterBy.subject) ||
                email.body.includes(this.filterBy.subject)
            )
        }
    }
}  