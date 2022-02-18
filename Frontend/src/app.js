const routes = [
    { path: '/pages/home', component: home },
    { path: '/pages/member', component: member },
    { path: '/pages/department', component: department },
    { path: '/pages/compliance', component: compliance },
];
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

const app = Vue.createApp({});

app.use(router);

app.mount('#app');