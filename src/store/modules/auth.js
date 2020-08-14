import { auth, db } from "boot/firebase";

const state = {
  currentUser: {},
  login_error: {}
};
const getters = {};

const actions = {
  loginUser({ commit }, payload) {
    if (payload.username.includes("@")) {
      auth.signInWithEmailAndPassword(payload.username, payload.password)
        .catch(err => {
          commit("setLoginError", err);
        });
    } else {
      let username = payload.username + "@gmail.com";
      auth.signInWithEmailAndPassword(username, payload.password)
        .catch(err => {
          commit("setLoginError", err);
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
          commit("setCurrentUser", {
            id: userId,
            name: userDetails.name,
            email: userDetails.email,
            role: userDetails.role
          });
          if (userDetails.role == "Secretary")
            this.$router.push("/staff-dashboard");
          if (userDetails.role == "Admin")
            this.$router.push("/admin-dashboard");
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
  setLoginError: (state, payload) => (state.login_error = payload)
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
