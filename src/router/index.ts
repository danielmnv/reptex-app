import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import VueMeta, { } from "vue-meta";

import ComingSoon from "../views/ComingSoon.vue"

Vue.use(VueRouter)
Vue.use(VueMeta)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: ComingSoon
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
