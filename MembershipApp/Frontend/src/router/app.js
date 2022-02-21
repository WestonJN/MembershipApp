const routes = [
    { path: '/components/home', component: home },
    { path: '/components/member', component: member },
    { path: '/components/department', component: department },
    { path: '/components/compliance', component: compliance },
];
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

const app = Vue.createApp({});

app.use(router);

app.mount('#app');