import { db } from "boot/firebase";
import { Notify } from "quasar";

const state = {
  events: []
};
const getters = {};

const actions = {
  async addEvent({ commit }, payload) {
    let ref = db.collection("events");
    await ref
      .add({
        title: payload.title,
        desc: payload.desc,
        date: payload.date,
        time: payload.time,
        color: payload.color
      })
      .then(res => {
        Notify.create({
          message: "New event added!",
          position: "center",
          color: "positive",
          icon: "thumb_up"
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  },

  async getEvents({ commit }) {
    let ref = db.collection("events");
    ref.onSnapshot(snap => {
      let changes = snap.docChanges();
      changes.forEach(change => {
        if (change.type == "added") {
          let record = change.doc.data();
          let id = change.doc.id;
          record.id = id;
          commit("setEvents", record);
        }
        if (change.type == "modified") {
          let record = change.doc.data();
          let id = change.doc.id;
          record.id = id;
          commit("setUpdatedEvent", record);
        }
        if (change.type == "removed") {
          let id = change.doc.id;
          commit("setRemovedEvent", id);
        }
      });
    });
  },

/*

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
  } */
};

const mutations = {
  setEvents: (state, event) => state.events.push(event),
  setUpdatedEvent: (state, payload) => {
    const index = state.events.findIndex(event => event.id === payload.id);
    if (index !== -1) {
      state.events.splice(index, 1, payload);
    }
  },
  setRemovedEvent: (state, id) =>
    (state.events = state.events.filter(event => event.id !== id))
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
