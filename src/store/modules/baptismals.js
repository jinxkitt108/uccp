import { auth, db } from "boot/firebase";
import { Notify } from "quasar";

const state = {
  baptismal_records: []
};
const getters = {};

const actions = {
  async addRecord({ commit }, payload) {
    let ref = db.collection("baptismal_records");
    await ref
      .add({
        serial_no: payload.serial_no,
        name: payload.name,
        birthdate: payload.birthdate,
        birthplace: payload.birthplace,
        gender: payload.gender,
        fathers_name: payload.fathers_name,
        mothers_name: payload.mothers_name,
        parents_address: payload.parents_address,
        baptized_on: payload.baptized_on,
        baptized_by:payload.baptized_by
      })
      .then(res => {
        Notify.create({
          message: "New record added!",
          position: "center",
          color: "positive",
          icon: "thumb_up"
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  },

  getBaptismalRecords({ commit }) {
    let ref = db.collection("baptismal_records");
    ref.onSnapshot(snap => {
      let changes = snap.docChanges();
      changes.forEach(change => {
        if (change.type == "added") {
          let record = change.doc.data();
          let id = change.doc.id;
          record.id = id;
          commit("setRecords", record);
        }
        if (change.type == "modified") {
          let record = change.doc.data();
          let id = change.doc.id;
          record.id = id;
          commit("setUpdatedRecord", record);
        }
        if (change.type == "removed") {
          let id = change.doc.id;
          commit("setRemovedRecord", id);
        }
      });
    });
  },

  async updateRecord({}, payload) {
    let ref = db.collection("baptismal_records").doc(payload.id);
    ref.update({
      serial_no: payload.serial_no,
      name: payload.name,
      birthdate: payload.birthdate,
      birthplace: payload.birthplace,
      gender: payload.gender,
      fathers_name: payload.fathers_name,
      mothers_name: payload.mothers_name,
      parents_address: payload.parents_address,
      baptized_on: payload.baptized_on,
      baptized_by:payload.baptized_by
    });
  },

  async removeRecord({}, id) {
    let ref = db.collection("baptismal_records").doc(id);
    ref.delete();
  }
};

const mutations = {
  setRecords: (state, record) => state.baptismal_records.push(record),
  setUpdatedRecord: (state, payload) => {
    const index = state.baptismal_records.findIndex(record => record.id === payload.id);
    if (index !== -1) {
      state.baptismal_records.splice(index, 1, payload);
    }
  },
  setRemovedRecord: (state, id) =>
    (state.baptismal_records = state.baptismal_records.filter(record => record.id !== id))
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
