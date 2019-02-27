import emailService from '../email-services/email-service.js';
import emailList from '../email-cmps/email-list-cmp.js'

export default {

        template: `
       <section class="main-email">
            <h1>Main-email</h1>
            <email-list v-bind:emails="emailsToShow" ></email-list>
       </section>
    `,
    data() {
        return {
            emails:[],
            selectedEmail: null

        } 
    },
    methods:{
       
    },
    created(){
        this.emails= emailService.getEmailsForDisplay()
        console.log(this.emails)
        var c=emailService.getEmailsForDisplay()
        console.log(c)
        // emailService.getEmailsForDisplay()
        //     .then(emails =>this.emails = emails)
        },

        components: {
            emailList
        },

        computed: {
            emailsToShow() {
                return this.emails}
    }
}  