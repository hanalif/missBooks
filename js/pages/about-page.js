export default {
    template:`
        <section class="about-page app-main">
            <h2>About Page</h2>
            <nav>
                <router-link to="/about/team">Our Team</router-link>|
                <router-link to="/about/services">Services</router-link>
            </nav>
            <router-view></router-view>
        </section>
    `
    
}