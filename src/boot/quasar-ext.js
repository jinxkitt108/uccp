import Vue from "vue";
import qcalendar from "@quasar/quasar-ui-qcalendar";
import { makeDate } from "@quasar/quasar-ui-qcalendar";
import "@quasar/quasar-ui-qcalendar/dist/index.css";

Vue.use(qcalendar);
window.makeDate = makeDate
