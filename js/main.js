
import bookApp from './pages/book-app.js';
import appHeader from './components/app-header.js';
import userMsg from './components/user-msg.js'
import appFooter from './components/app-footer.js';
import { router } from './router.js';


const options = {
    el: '#app',
    router,
    template: `
        <section>
            <user-msg />
            <app-header />
            <router-view />
            <app-footer />
        </section>
    `,
    components: {
        bookApp,
        appHeader,
        appFooter,
        userMsg
    }
};

const app = new Vue(options);