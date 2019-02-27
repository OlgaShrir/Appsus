import mainApp from '../js/pages/main-app-cmp.js'
import emailMain from '../js/apps/email/email-pages/email-main-cmp.js'
import keepMain from '../js/apps/keep/keep-pages/keep-main-cmp.js'


const routes = [
    { path: '/', component: mainApp },
    { path: '/email', component: emailMain },
    { path: '/keep', component: keepMain },
    
]

export default routes;