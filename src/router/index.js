import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from "@/components/HelloWorld.vue";
import UsersData from "@/views/UsersData.vue";
import PostsData from "@/views/PostsData.vue";
import UserData from "@/components/users/UserData.vue";
import PostData from "@/components/posts/PostData";
import ProductsData from "@/views/ProductsData.vue";
import ProductData from "@/components/products/ProductData.vue";
import UserRegister from "@/views/UserRegister.vue"; 
import UserLogin from "@/views/UserLogin.vue"; 
import UserCategory from "@/views/UserCategory.vue";
import ProductCrud from "@/views/ProductCrud.vue"; 


const routes = [
    { path: '/', component: HelloWorld, name: 'Home' },
    { path: '/users', component: UsersData, name: 'UsersData' },
    { path: '/user-data', component: UserData, name: 'UserData' },
    { path: '/posts', component: PostsData, name: 'PostsData' },
    { path: '/products', component: ProductsData, name: 'ProductsData' },
    { path: '/product/:id', component: ProductData, name: 'ProductData' },
    { path: '/post/:id/user/:userId', component: PostData, name: 'PostData' },
    { path: '/register', component: UserRegister, name: 'UserRegister' }, 
    { path: '/login', component: UserLogin, name: 'UserLogin' },
    { path: '/usercategory', component: UserCategory, name: 'UserCategory' },
    { path: '/adminproduct', component: ProductCrud, name: 'ProductCrud' },

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});
router.beforeEach((to, _from, next) => {
    const isAdmin = localStorage.getItem('roles') === 'Admin'; 
    if (to.name === 'CategoryData' && !isAdmin) {
        next({ name: 'UserCategory' }); 
    } else {
        next(); 
    }
});

export default router;
