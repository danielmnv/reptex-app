import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import VueMeta from "vue-meta";

Vue.use(VueRouter)
Vue.use(VueMeta)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: () => import("../views/ComingSoon.vue")
    },
    {
        path: '/mapa',
        name: 'map',
        component: () => import("../views/Map.vue")
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
