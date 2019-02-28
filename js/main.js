import myRoutes from './routes.js'
import mainApp from '../js/pages/main-app-cmp.js'

Vue.use(VueRouter);

const myRouter = new VueRouter({routes: myRoutes})


window.vueApp = new Vue({
    el: '#app',
    router: myRouter,
    components: {
        mainApp
    },
    
})
