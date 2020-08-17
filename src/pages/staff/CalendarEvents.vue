<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-toolbar class="row justify-between items-center bg-blue-9">
        <q-btn-group flat>
          <q-btn color="white" flat label="Prev" @click="onPrev" />
          <q-btn color="white" flat label="Next" @click="onNext" />
        </q-btn-group>

        <q-toolbar-title class="text-h5 text-bold text-white text-center">
          {{ title }}
        </q-toolbar-title>
      </q-toolbar>
      <q-calendar
        ref="calendar"
        view="month"
        :weekdays="[1, 2, 3, 4, 5, 6, 0]"
        v-model="selectedDate"
        @change="onChange"
        @click:day="openDialog"
      >
        <template #day="{ timestamp }">
          <template v-for="(event, index) in getEvents(timestamp)">
            <q-badge
              :key="index"
              style="width: 100%; cursor: pointer; height: 16px; max-height: 16px"
              class="q-event"
              :style="'background-color: ' + event.color"
            >
              <span class="ellipsis">{{ event.title }}</span>
              <span class="q-ml-sm">{{
                formatTime(event.date, event.time)
              }}</span>
              <q-tooltip transition-show="rotate" transition-hide="rotate">
                <div class="text-subtitle2">{{ event.title }}</div>
                <div class="text-subtitle2">{{ event.time }}</div>
                <div class="text-caption q-mt-sm">{{ event.desc }}</div>
              </q-tooltip>
            </q-badge>
          </template>
        </template>
      </q-calendar>

      <!-- Calendar Event Dialog -->

      <q-dialog v-model="event_dialog" persistent>
        <q-card style="width: 600px; max-width: 80vw;">
          <q-toolbar class="bg-blue-8 text-white">
            <q-toolbar-title>
              {{ editMode ? "Edit Event" : "New Event Details" }}
            </q-toolbar-title>
          </q-toolbar>
          <q-card-section>
            <q-form @submit="saveEvent" class="q-gutter-md">
              <div class="row q-gutter-md">
                <q-input
                  v-model="event_form.title"
                  hint="Event Title"
                  placeholder="Type event title..."
                  outlined
                  style="width: 250px"
                />
                <q-input
                  type="time"
                  hint="Time"
                  v-model="event_form.time"
                  outlined
                />
                <q-input
                  v-model="event_form.color"
                  hint="Event Color"
                  class="my-input"
                  style="width: 120px"
                  :bg-color="event_form.color"
                  readonly
                  borderless

                >
                  <template v-slot:append>
                    <q-icon name="colorize" class="cursor-pointer">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-color v-model="event_form.color" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="q-px-md">
                <q-input
                  v-model="event_form.desc"
                  type="textarea"
                  placeholder="Type event description..."
                  outlined
                  dense
                />
              </div>
              <div class="row q-gutter-md">
                <q-space />
                <q-btn @click="close" label="Cancel" flat dense />
                <q-btn type="submit" label="Save" color="primary" dense />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-card>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      selectedDate: "",
      title: "",
      dateFormatter: void 0,
      start: void 0,
      editMode: false,
      event_dialog: false,
      event_form: new Form({
        title: "",
        desc: "",
        time: "",
        date: "",
        color: "#0a4ccf"
      })
    };
  },

  computed: {
    ...mapState("events", ["events"])
  },

  methods: {
    ...mapActions("events", ["addEvent"]),
    formatTime(d, t) {
      let timex = new Date(d + " " + t);
      let formattedString = date.formatDate(timex, "h:mm A");
      return formattedString;
    },

    getEvents(dt) {
      const events = [];
      for (let i = 0; i < this.events.length; ++i) {
        if (this.events[i].date === dt.date) {
          events.push(this.events[i]);
        }
      }
      return events;
    },

    openDialog(data) {
      console.log(data);
      this.event_form.date = data.scope.date;
      this.event_dialog = true;
    },
    close() {
      this.event_dialog = false;
      this.event_form.reset();
    },
    async saveEvent() {
      this.addEvent(this.event_form).then(() => {
        this.close();
      });
    },
    onChange({ start }) {
      this.title = date.formatDate(start.date, "MMMM YYYY");
    },

    onPrev() {
      this.$refs.calendar.prev();
    },

    onNext() {
      this.$refs.calendar.next();
    }
  }
};
</script>
