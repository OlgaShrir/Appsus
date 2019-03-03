
import emailPreview from './email-preview-cmp.js'
import emailService from '../email-services/email-service.js';


export default {
    props:['filtered'],
    template: `
        <section class="email-list">
            <ul v-for="(currEmail, idx) in filtered">
                <!-- <li v-for="(currEmail, idx) in filtered">                           -->
                    <email-preview 
                        @readEmail="readEmail"
                        @deleteEmail="deleteEmail"
                        @markAsUnread="markAsUnread"   
                        :email="currEmail" 
                        :idx="idx"
                        @click.native="openEmail(currEmail.id)"  >
                    </email-preview>
                    <router-view ></router-view>                
                <!-- </li> -->
                
            </ul>
        </section>
    `,

    data() {
        return {
            emails: []
        }},

    
    created() {
        console.log('I was created')
    emailService.getEmailsForDisplay()
            //console.log('test', emailService.getEmailsForDisplay())
            .then(emails => this.emails = emails)
    },
    
    methods: {
        openEmail(id) {
            this.$router.push('/email/open-email/' + id);
        },
     readEmail(email){
        emailService.updateAsRead(email.id);
        this.emails=emailService.getEmailsForDisplay(); 
       // console.log('test')
     },
     deleteEmail(email){  
        // console.log('test')
       emailService.deleteEmail(email.id);
       emailService.getEmailsForDisplay().then(emails => {
         //console.log(emails)
         this.emails = emails;
        }); 
        this.$emit('deleted', email);
    //    this .$router.push('/email/email-list')

     },
     markAsUnread(email){
        emailService.updateAsUnread(email.id);
        this.emails=emailService.getEmailsForDisplay(); 
     }
    },
    computed: {
        emailsToShow(){
         emailService.getEmailsForDisplay().then(emails => this.emails = emails); 
        }
    },
    components: {
        emailPreview
    }
}