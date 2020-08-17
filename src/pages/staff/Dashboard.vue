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
    <div class="row q-pa-md q-gutter-md">
      <q-card style="width: 400px">
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
    <!--   <div class="q-pa-md">
      <q-card>
        <q-card-section>
          <div class="row justify-between">
            <div>
              <q-btn flat label="Prev" @click="calendarPrev" />
              <q-btn flat label="Next" @click="calendarNext" />
            </div>
            <div class="text-h6">{{ calendar_title }}</div>
            <q-btn
              @click="openDialog"
              label="Add Event"
              flat
              color="primary"
              style="border: 1px solid blue; border-style: dashed"
              icon="add"
            />
            <q-dialog v-model="event_dialog" persistent>
              <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section class="text-h6 text-center">
                  {{ editMode ? "Edit Event" : "New Event Details" }}
                </q-card-section>
                <q-card-section>
                  <q-form @submit="saveEvent" class="q-gutter-md">
                    <div class="row q-gutter-md justify-center item-center">
                      <q-date v-model="event_form.date" />
                      <q-time v-model="event_form.time" />
                    </div>
                    <q-input
                      v-model="event_form.title"
                      class="q-mx-auto"
                      label="Event Title"
                      style="max-width: 300px"
                    />
                    <q-input
                      v-model="event_form.desc"
                      type="textarea"
                      label="Event Description"
                      outlined
                      dense
                    />
                    <div class="row q-gutter-md">
                      <q-space />
                      <q-btn @click="close" label="Cancel" flat dense />
                      <q-btn type="submit" label="Save" color="primary" dense />
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </q-dialog>
          </div>
        </q-card-section>
        <q-card-section style="overflow: hidden">
          <q-calendar
            v-model="selectedDate"
            ref="calendar"
            view="week-agenda"
            :weekdays="[1, 2, 3, 4, 5, 6, 0]"
            transition-prev="slide-right"
            transition-next="slide-left"
            style="height: 300px;"
            @change="onChange"
            animated
          >
            <template #day-body="{ timestamp }">
              <template v-for="agenda in getAgenda(timestamp)">
                <div
                  :key="timestamp.date + agenda.time"
                  :label="agenda.time"
                  class="justify-start q-ma-sm shadow-5 bg-grey-6"
                >
                  <div class="col-12 q-px-sm">
                    <strong>{{ agenda.time }}</strong>
                  </div>
                  <div
                    v-if="agenda.desc"
                    class="col-12 q-px-sm"
                    style="font-size: 10px;"
                  >
                    {{ agenda.desc }}
                  </div>
                </div>
              </template>
            </template>
          </q-calendar>
        </q-card-section>
      </q-card>
    </div> -->
  </q-page>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
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
    ...mapState("baptismals", ["baptismal_records"])
  },

  methods: {
    onPrev() {
      this.$refs.calendar.prev();
    },

    onNext() {
      this.$refs.calendar.next();
    },

    onChange({start}) {
      let timestamp = start.date
      this.month_title = date.formatDate(timestamp, "MMMM" )
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
