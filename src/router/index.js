import { createRouter, createWebHistory } from 'vue-router';
import RegistrationPage from "@/views/RegistrationPage.vue"; 
import LoginPage from "@/views/LoginPage.vue"; 
import AdProductPage from "@/views/AdProductPage.vue";
import CatalogPage from "@/views/CatalogPage.vue";  
import AdCategoryPage from "@/views/AdCategoryPage.vue";
import AdClientPage from "@/views/AdClientPage.vue";
import ModeratorPage from "@/views/ModeratorPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import KorzinaPage from "@/views/KorzinaPage.vue";

const routes = [
    { path: '/register', component: RegistrationPage, name: 'RegistrationPage' }, 
    { path: '/login', component: LoginPage, name: 'LoginPage' },
    { path: '/adproduct', component: AdProductPage, name: 'AdProductPage' },
    { path: '/adclient', component: AdClientPage, name: 'AdClientPage' },
    { path: '/moderator', component: ModeratorPage, name: 'ModeratorPage' },
    { path: '/profile', component: ProfilePage, name: 'ProfilePage' },
    { path: '/korzina', component: KorzinaPage, name: 'KorzinaPage' },
    { path: '/catalog', component: CatalogPage, name: 'CatalogPage' },
    { path: '/adcategory', component: AdCategoryPage, name: 'AdCategoryPage' },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});
router.beforeEach((to, _from, next) => {
    const userRole = localStorage.getItem('roles');

    switch (userRole) {
        case 'Admin':
            if (to.name === 'ProfilePage') {
                next({ name: 'AdCategoryPage' });
            } else {
                next();
            }
            break;
        case 'Moderator':
            if (to.name !== 'ModeratorPage') {
                next({ name: 'ModeratorPage' });
            } else {
                next();
            }
            break;
        default:
            next();
    }
});


export default router;



