import Vue from 'vue'
import VueRouter from 'vue-router'

import user_Login from './login/user_Login.vue'
import user_Edit from './login/user_Edit.vue'
import Terminal_Home from './terminal/terminal_Home.vue'
import Terminal_User from './terminal/terminal_User.vue'
import lend_Process from './book_Process/lend_Process.vue'
import search_Process from './book_Process/search_Process.vue'

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
    {
        path: '/Terminal_user',
        name: 'Terminal_User',
        component: Terminal_User
    },
    {
        path: '/lend_process',
        name: 'lend_Process',
        component: lend_Process
    },
    {
        path: '/search_process',
        name: 'search_Process',
        component: search_Process
    },
    
]

const router = new VueRouter({
    routes,
})

export default router;