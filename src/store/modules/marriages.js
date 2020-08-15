import { auth, db } from "boot/firebase";
import { Notify } from "quasar";

const state = {
  records: []
};
const getters = {};

const actions = {
  async addRecord({ commit }, payload) {
    let ref = db.collection("marriage_records");
    await ref
      .add({
        serial_no: payload.serial_no,
        male_name: payload.male_name,
        male_age: payload.male_age,
        female_name: payload.female_name,
        female_age: payload.female_age,
        date_solemnized: payload.date_solemnized,
        license_no: payload.license_no,
        date_issued: payload.date_issued,
        place_issued: payload.place_issued,
        registry_no: payload.registry_no,
        solemnized_by: payload.solemnized_by
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

  getRecords({ commit }) {
    let ref = db.collection("marriage_records");
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
    let ref = db.collection("marriage_records").doc(payload.id);
    ref.update({
      serial_no: payload.serial_no,
      male_name: payload.male_name,
      male_age: payload.male_age,
      female_name: payload.female_name,
      female_age: payload.female_age,
      date_solemnized: payload.date_solemnized,
      license_no: payload.license_no,
      date_issued: payload.date_issued,
      place_issued: payload.place_issued,
      registry_no: payload.registry_no,
      solemnized_by: payload.solemnized_by
    });
  },

  async removeRecord({}, id) {
    let ref = db.collection("marriage_records").doc(id);
    ref.delete();
  }
};

const mutations = {
  setRecords: (state, record) => state.records.push(record),
  setUpdatedRecord: (state, payload) => {
    const index = state.records.findIndex(record => record.id === payload.id);
    if (index !== -1) {
      state.records.splice(index, 1, payload);
    }
  },
  setRemovedRecord: (state, id) =>
    (state.records = state.records.filter(record => record.id !== id))
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
