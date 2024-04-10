import Vue from 'vue'
import VueRouter from 'vue-router'

import user_Login from './login/user_Login.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'user_Login',
        component: user_Login
    },
]

const router = new VueRouter({
    routes,
})

export default router;