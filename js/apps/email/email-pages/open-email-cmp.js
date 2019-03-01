import emailService from '../email-services/email-service.js';
import {eventBus, READ_EMAILS} from '../../../services/eventbus-service.js';

//var interval;

export default {
    template: `
        <section class="open-email">
            <h1>{{email.subject}}</h1>
            <div class="email-body">{{email.body}}</div>
        </section>
    `,
    created() {
        //console.log('Param from route:', this.$route.params.emailId);
        const emailId = this.$route.params.emailId;
        var a = emailService.getEmailById(emailId)
            .then(email => this.email = email)
        eventBus.$emit(READ_EMAILS, this.email.id) 

    },
    destroyed() {

    },
    mounted() {


    },
    data() {
        return {
            email: null,

        }
    },
    methods: {
    },
    computed: {

    }
}
