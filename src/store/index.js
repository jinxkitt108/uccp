import Vue from "vue";
import Vuex from "vuex";

import users from "./modules/users";
import auth from "./modules/auth";
import members from "./modules/members";
import marriages from "./modules/marriages";
import baptismals from "./modules/baptismals";
import events from "./modules/events";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      users, auth, members, marriages, baptismals, events
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
