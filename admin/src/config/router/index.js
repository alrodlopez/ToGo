import Vue from 'vue'
import Router from 'vue-router'
import store from '@/config/store'


Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
        path: '/',
        redirect: { path: "/login" },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../../components/views/Login'),
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/dashboard',
        component: () => import('../../components/template/Dashboard'),
        children: [
            {
                path: '/',
                name: 'restaurantes',
                component: () => import('../../components/views/restaurantes/index'),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/categorias',
                name: 'categorias',
                component: () => import('../../components/views/categorias/index'),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/registrar',
                name: 'registrar',
                component: () => import('../../components/views/restaurantes/register'),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/repartidores',
                name: 'repartidores',
                component: () => import('../../components/views/repartidores/index'),
                meta: {
                    requiresAuth: true,
                },
            },
        ]
    },
  ]
});

router.beforeEach((to, from, next) => {
    const isLogged = store.getters['auth/authenticated'];
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLogged) {
            next({
                path: '/login',
            })
        } else {
            next()
        }
    } else if (!to.matched.some(record => record.meta.requiresAuth)) {
        if (isLogged) {
            next({
                path: '/dashboard',
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router;
