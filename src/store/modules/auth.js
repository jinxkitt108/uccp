import { auth, db } from "boot/firebase";

const state = {
  currentUser: {},
  login_loading: false,
  login_error: {}
};
const getters = {};

const actions = {
  loginUser({ commit }, payload) {
    commit("setLoginLoading", true);
    if (payload.username.includes("@")) {
      auth
        .signInWithEmailAndPassword(payload.username, payload.password)
        .catch(err => {
          commit("setLoginError", err);
          commit("setLoginLoading", false);
        });
    } else {
      let username = payload.username + "@gmail.com";
      auth.signInWithEmailAndPassword(username, payload.password).catch(err => {
        commit("setLoginError", err);
        commit("setLoginLoading", false);
      });
    }
  },

  logoutUser() {
    auth.signOut();
  },

  handleAuthStateChanged({ commit }) {
    auth.onAuthStateChanged(user => {
      if (user) {
        let userId = auth.currentUser.uid;
        let ref = db.collection("users").doc(userId);
        ref.get().then(details => {
          let userDetails = details.data();
          commit("setLoginLoading", false);
          commit("setCurrentUser", {
            id: userId,
            name: userDetails.name,
            email: userDetails.email,
            role: userDetails.role
          });
          if (userDetails.role == "Secretary") {
            this.$router.push("/staff/dashboard");
          } else if (userDetails.role == "Admin") {
            this.$router.push("/admin/dashboard");
          }
        });
      } else {
        commit("setCurrentUser", {});
        this.$router.replace("/");
      }
    });
  }
};

const mutations = {
  setCurrentUser: (state, payload) => (state.currentUser = payload),
  setLoginLoading: (state, payload) => (state.login_loading = payload),
  setLoginError: (state, payload) => (state.login_error = payload)
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
