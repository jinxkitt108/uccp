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
          let member = change.doc.data();
          let id = change.doc.id;
          member.id = id;
          commit("setMembers", member);
        }
        if (change.type == "modified") {
          let member = change.doc.data();
          let id = change.doc.id;
          member.id = id;
          commit("setUpdatedMember", member);
        }
        if (change.type == "removed") {
          let id = change.doc.id;
          commit("setRemovedMember", id);
        }
      });
    });
  },

  async updateMember({}, payload) {
    let ref = db.collection("members").doc(payload.id);
    ref.update({
      reg_no: payload.reg_no,
      date_reg: payload.date_reg,
      name: payload.name,
      gender: payload.gender,
      birthdate: payload.birthdate,
      address: payload.address
    });
  },

  async removeMember({}, id) {
    let ref = db.collection("members").doc(id);
    ref.delete();
  }
};

const mutations = {
  setMembers: (state, member) => state.members.push(member),
  setUpdatedMember: (state, payload) => {
    const index = state.members.findIndex(member => member.id === payload.id);
    if (index !== -1) {
      state.members.splice(index, 1, payload);
    }
  },
  setRemovedMember: (state, id) =>
    (state.members = state.members.filter(member => member.id !== id))
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
