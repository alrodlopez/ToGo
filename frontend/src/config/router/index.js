import Vue from "vue";
import Router from "vue-router";
import store from "@/config/store";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "login",
            component: () => import("../../components/views/Login"),
            meta: {
                requiresAuth: false
            }
        },
        {
            path: "/dashboard",
            component: () => import("../../components/template/Dashboard"),
            children: [
                {
                    path: "/",
                    name: "escritorio",
                    component: () => import("../../components/views/Index"),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/productos',
                    name: 'productos',
                    component: () => import('../../components/views/productos/Index'),
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: '/repartidores',
                    name: 'repartidores',
                    component: () => import('../../components/views/repartidores/Index'),
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: '/pedidos',
                    name: 'pedidos',
                    component: () => import('../../components/views/pedidos/lista'),
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: '/restaurantes',
                    name: 'restaurantes',
                    component: () => import('../../components/views/Mirestaurante/Index'),
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: '/usuarios',
                    name: 'usuarios',
                    component: () => import('../../components/views/usuarios/Index'),
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: '/categorias',
                    name: 'categorias',
                    component: () => import('../../components/views/categorias/Index'),
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: '/tipos',
                    name: 'tipos',
                    component: () => import('../../components/views/tipos/Index'),
                    meta: {
                        requiresAuth: true,
                    },

                },
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    const isLogged = store.getters["auth/authenticated"];
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLogged) {
            next({
                path: "/"
            });
        } else {
            next();
        }
    } else if (!to.matched.some(record => record.meta.requiresAuth)) {
        if (isLogged) {
            next({
                path: "/dashboard"
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
