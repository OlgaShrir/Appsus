import emailMain from '../apps/email/email-pages/email-main-cmp.js'
import keepMain from '../apps/keep/keep-pages/keep-main-cmp.js'


export default {
    components: {
        emailMain,
        keepMain
    }, 
    template: `
       <section class="main-app">
            <h1>Main App</h1>


            <!-- <email-main></email-main>
            <keep-main></keep-main> -->
       </section>
    `,
    data() {
        return {

        } 
    },
    methods:{
       
    },
    created(){

    }
}