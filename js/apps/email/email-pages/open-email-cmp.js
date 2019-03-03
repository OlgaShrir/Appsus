import emailService from '../email-services/email-service.js';
//import {eventBus, READ_EMAILS} from '../../../services/eventbus-service.js';

//var interval;

export default {
    template: `
        <section class="open-email flex column">
        <div>
        <div class="fas fa-trash-alt" @click="onDeleteEmail" title="Delete Email"></div>
        <div class="fas fa-reply-all" title="Reply"></div>
        <div class="fas fa-backspace back-from-open" @click.stop="backToInbox" title="Back"></div>
        </div>
            <h1 class="open-email-header">{{email.subject}}</h1>
            <div class="email-from"> {{email.from}}</div>
            <div class="email-body">{{email.body}}</div>
            
            
            
        </section>
    `,

    data() {
        return {
            email: {},
        }
    },

    created() {
        const emailId = this.$route.params.emailId;
        var a = emailService.getEmailById(emailId)
            .then(email => this.email = email)
    },



    destroyed() {

    },
    mounted() {

    },

    methods: {
        onDeleteEmail(email){
            emailService.deleteEmail(this.email.id)
            this.$router.push('/email/email-list')
        },
        backToInbox(){
            this.$router.push('/email/email-list')
        }
    },

    computed: {

    }
}
