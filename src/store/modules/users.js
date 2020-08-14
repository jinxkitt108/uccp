import { db } from "boot/firebase";

const state = {
  users: []
};

const getters = {};

const actions = {
  getUsers({ commit }) {
    db.collection("users").get().then(docs => {
      docs.forEach(doc => {
        let id = doc.id
        let user = doc.data()
        user.id = id
        commit('setUsers', user)
      })
    });
  }
};

const mutations = {
  setUsers: (state, user) => state.users.push(user)
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
