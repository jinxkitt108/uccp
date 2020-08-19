<template>
  <q-page padding>
    <div class="text-h5">Dashboard</div>
    <div class="row q-pa-md q-gutter-md">
      <q-card class="members-card text-white q-px-lg">
        <q-card-section>
          <div>
            <q-icon name="account_circle" style="font-size: 50px" />
          </div>
          <div class="text-h6">
            Members<span class="q-ml-md text-bold">{{ members.length }}</span>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="marriages-card text-white q-px-lg">
        <q-card-section>
          <div>
            <q-icon name="loyalty" style="font-size: 50px" />
          </div>
          <div class="text-h6">
            Marriage<span class="q-ml-md text-bold">{{ records.length }}</span>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="baptismal-card text-white q-px-lg">
        <q-card-section>
          <div>
            <q-icon name="note" style="font-size: 50px" />
          </div>
          <div class="text-h6">
            Baptismal<span class="q-ml-md text-bold">{{
              baptismal_records.length
            }}</span>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="row q-pa-md q-gutter-lg">
      <div class="col q-pa-sm ">
        <q-card bordered>
          <q-card-section>
            <div class="text-subtitle1 text-bold">Events</div>

            <q-scroll-area
              class="rounded-borders"
              :thumb-style="thumbStyle"
              :bar-style="barStyle"
              style="height: 200px"
            >
              <q-list>
                <q-item v-for="event in events" :key="event.id">
                  <q-item-section avatar>
                    <q-icon color="primary" name="event_note" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ event.title }}</q-item-label>
                    <q-item-label caption class="text-bold text-dark">
                      {{ formatTimestamp(event.date, event.time) }}
                    </q-item-label>
                    <q-item-label caption lines="2">{{
                      event.desc
                    }}</q-item-label>
                  </q-item-section>
                  <div>
                    <q-btn
                      @click="deleteEvent(event.id)"
                      color="red-10"
                      icon="delete"
                      flat
                      round
                      no-caps
                    >
                      <q-tooltip anchor="bottom middle" self="top middle">
                        Delete Event
                      </q-tooltip>
                    </q-btn>
                  </div>
                </q-item>
              </q-list>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>
      <!--  Mini Calendar -->
      <q-card class="col">
        <q-toolbar class="justify-between">
          <q-btn @click="onPrev" icon="arrow_left" label="Prev" flat dense />
          <q-toolbar-title class="text-center text-subtitle1 text-bold">
            {{ month_title }}
          </q-toolbar-title>
          <q-btn
            @click="onNext"
            icon-right="arrow_right"
            label="Next"
            flat
            dense
          />
        </q-toolbar>
        <q-calendar
          ref="calendar"
          v-model="selectedDate"
          mini-mode
          :weekdays="[1, 2, 3, 4, 5, 6, 0]"
          @change="onChange"
        />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2
      },
      month_title: "",
      selectedDate: "",
      editMode: false,
      event_dialog: false,
      event_form: new Form({
        title: "",
        desc: "",
        time: "",
        date: ""
      })
    };
  },

  computed: {
    ...mapState("members", ["members"]),
    ...mapState("marriages", ["records"]),
    ...mapState("baptismals", ["baptismal_records"]),
    ...mapState("events", ["events"])
  },

  methods: {
    ...mapActions("events", ["removeEvent"]),

    deleteEvent(id) {
      this.$q
        .dialog({
          title: "Confirm Delete",
          message: "Remove event?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.removeEvent(id).then(() => {
            this.$q.notify({
              message: "Event removed!",
              icon: "thumb_up",
              color: "positive"
            });
          });
        });
    },

    formatTimestamp(d, t) {
      let timestamp = new Date(d + " " + t);
      let formattedString = date.formatDate(timestamp, "MMM D, YYYY @h:mm A");
      return formattedString;
    },

    onPrev() {
      this.$refs.calendar.prev();
    },

    onNext() {
      this.$refs.calendar.next();
    },

    onChange({ start }) {
      let timestamp = start.date;
      this.month_title = date.formatDate(timestamp, "MMMM");
    }
  }
};
</script>

<style lang="scss" scoped>
.members-card {
  background: rgb(11, 65, 180);
  background: linear-gradient(
    310deg,
    rgba(11, 65, 180, 1) 27%,
    rgba(50, 74, 223, 1) 57%,
    rgba(18, 18, 164, 1) 100%
  );
}
.marriages-card {
  background: rgb(190, 6, 195);
  background: linear-gradient(
    310deg,
    rgba(190, 6, 195, 1) 27%,
    rgba(223, 50, 213, 1) 57%,
    rgba(208, 11, 197, 1) 100%
  );
}
.baptismal-card {
  background: rgb(11, 145, 139);
  background: linear-gradient(
    310deg,
    rgba(11, 145, 139, 1) 30%,
    rgba(5, 121, 116, 1) 57%,
    rgba(11, 142, 119, 1) 100%
  );
}
</style>
