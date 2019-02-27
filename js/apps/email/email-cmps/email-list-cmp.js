
import emailPreview from './email-preview-cmp.js'


export default {
    template: `
        <section class="email-list">
            <ul>
                <li :key="currEmail.id" 
                    v-for="(currEmail, idx) in emails">
                    <router-link
                    :to="'/email/' + currEmail.id ">
                        <email-preview 
                            :email="currEmail"  >
                        </email-preview>
                    </router-link>
                  
                </li>
                
            </ul>
        </section>
    `,
    props: ['emails'],
    methods: {
      // selectEmail(email){
      //   this.$emit('selected',email)
    },
    
    components: {
        emailPreview
    }
}