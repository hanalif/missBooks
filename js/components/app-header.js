export default {
    template: `
    <header class="app-header">
    <div class="nav-container main-layout">
        <div class="logo">
            <h1>Logo</h1>
        </div>
        <nav>
            <router-link to="/">Home</router-link>|
            <router-link to="/book">Books</router-link>|
            <router-link to="/about">About</router-link>
            
        </nav>
    </div> 
    </header>
    `,
};

