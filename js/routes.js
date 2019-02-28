import mainApp from '../js/pages/main-app-cmp.js'
import emailMain from '../js/apps/email/email-pages/email-main-cmp.js'
import keepMain from '../js/apps/keep/keep-pages/keep-main-cmp.js'
import openEmail from '../js/apps/email/email-pages/open-email-cmp.js'


const routes = [
    { path: '/', component: mainApp },
    { path: '/email', component: emailMain },
    { path: '/keep', component: keepMain },
    { path: '/email/:emailId', component: openEmail},
    
]

export default routes;



// export default [
//     { path: '/', component: mainApp },
//     { path: '/email', component: emailMain },
//     { path: '/keep', component: keepMain },
    
// ]
