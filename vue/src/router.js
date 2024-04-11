import Vue from 'vue'
import VueRouter from 'vue-router'

import user_Login from './login/user_Login.vue'
import user_Edit from './login/user_Edit.vue'
import Terminal_Home from './terminal/terminal_Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'user_Login',
        component: user_Login
    },
    {
        path: '/user_edit',
        name: 'user_Edit',
        component: user_Edit
    },
    {
        path: '/terminal_home',
        name: 'terminal_Home',
        component: Terminal_Home
    },
]

const router = new VueRouter({
    routes,
})

export default router;