import { auth, db } from "./firebase";

export default ({ router, store, Vue }) => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
      if (auth.currentUser) {
        next();
      } else {
        next({ path: '/adminlogin' });
      }
    }
    next();
  })
}
