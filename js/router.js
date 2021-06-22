import bookApp from './pages/book-app.js';
import bookDetails from './pages/book-details.js';
import aboutPage from './pages/about-page.js';
import homePage from './pages/home-page.js';
import aboutTeam from './components/about-team.js';
import aboutServices from './components/about-service.js';



const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/about',
        component: aboutPage,
        children: [
            {
                path: '/about/team',
                component: aboutTeam,
            },
            {
                path: '/about/services',
                component: aboutServices,
            }
        ]
    },
    {
        path: '/book/:bookId',
        name: 'book-details',
        component: bookDetails
    },


];

export const router = new VueRouter({ routes });