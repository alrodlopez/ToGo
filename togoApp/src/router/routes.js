
const routes = [
  {
    path: '/',
    redirect: {
        name: "Login"
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/LoginPage.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/inicio',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Entregas',
        component: () => import('pages/Entregas.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/detalle/:id',
        name: 'Detalle',
        component: () => import('pages/Detalle.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/historial',
        name: 'Historial',
        component: () => import('pages/Historial'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/perfil',
        name: 'Perfil',
        component: () => import('pages/Perfil'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
