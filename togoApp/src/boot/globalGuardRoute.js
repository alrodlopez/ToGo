//global guards
export default async ({ store, router }) => {

  router.beforeEach((to, from, next) => {
    const isLogged = store.getters['authModule/isLogged'];
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!isLogged) {
        next({
          path: '/',
        })
      } else {
        next()
      }
    } else if (!to.matched.some(record => record.meta.requiresAuth)) {
      if (isLogged) {
        next({
          path: '/inicio',
        })
      } else {
        next()
      }
    } else {
      next()
    }
  })

}
