import myRoutes from './routes.js'
import mainApp from '../js/pages/main-app-cmp.js'

const myRouter = new VueRouter({routes: myRoutes})

window.vueApp = new Vue({
    el: '#app',
    router: myRouter,
    components: {
        mainApp
    },
    
})
