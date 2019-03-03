import emailService from '../email-services/email-service.js';
//import {eventBus, READ_EMAILS} from '../../../services/eventbus-service.js';

//var interval;

export default {
    template: `
        <section class="open-email">
            <h1>{{email.subject}}</h1>
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
    },

    computed: {

    }
}
