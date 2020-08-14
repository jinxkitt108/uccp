import { auth, db } from "boot/firebase";
import { Notify } from "quasar";

const state = {
  members: []
};
const getters = {};

const actions = {
  async addMember({ commit }, payload) {
    let ref = db.collection("members");
    await ref
      .add({
        reg_no: payload.reg_no,
        date_reg: payload.date_reg,
        name: payload.name,
        gender: payload.gender,
        birthdate: payload.birthdate,
        address: payload.address
      })
      .then(res => {
        Notify.create({
          message: "New member added!",
          position: "center",
          color: "positive",
          icon: "thumb_up"
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  },

  getMembers({ commit }) {
    let ref = db.collection("members");
    ref.onSnapshot(snap => {
      let changes = snap.docChanges();
      changes.forEach(change => {
        if (change.type == "added") {
          commit("setMembers", change.doc.data());
        }
      });
    });
  }
};

const mutations = {
  setMembers: (state, member) => state.members.push(member)
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
