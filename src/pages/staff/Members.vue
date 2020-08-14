<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        :data="members"
        :columns="columns"
        row-key="name"
        :filter="filter"
      >
        <template v-slot:top-left>
          <q-btn
            @click="openDialog"
            label="Member"
            flat
            color="primary"
            style="border: 1px solid blue; border-style: dashed"
            icon="add"
          />
        </template>
        <template v-slot:top-right>
          <q-input dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>

    <!-- New Member Dialog -->
    <q-dialog v-model="member_dialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6 text-center">New Member</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="saveNewMember" class="q-pa-md q-gutter-md">
            <div class="row justify-between">
              <q-input
                v-model="member_form.reg_no"
                label="Reg. No."
                style="width: 150px"
                dense
              />
              <q-input
                v-model="member_form.date_reg"
                type="date"
                hint="Date Registered"
                dense
              />
            </div>
            <div class="row q-gutter-md">
              <q-input
                v-model="member_form.name"
                label="Full Name"
                style="width: 250px"
                dense
              />
              <q-select
                v-model="member_form.gender"
                label="Gender"
                :options="['Male', 'Female']"
                style="width: 100px"
                dense
              />
              <q-input
                v-model="member_form.birthdate"
                type="date"
                hint="Birthdate"
                dense
              />
            </div>
            <q-input v-model="member_form.address" label="Address" dense />
            <div class="row q-pa-sm justify-end">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn type="submit" color="primary" label="Save" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      member_dialog: false,
      filter: "",
      member_form: new Form({
        reg_no: "",
        date_reg: "",
        name: "",
        gender: "",
        birthdate: "",
        address: ""
      }),
      columns: [
        {
          name: "reg_no",
          align: "center",
          label: "Reg. No.",
          field: "reg_no",
          sortable: true,
          classes: "bg-grey-2 ellipsis",
          headerClasses: "bg-primary text-white"
        },
        {
          name: "name",
          required: true,
          label: "Name",
          field: "name",
          align: "left",
          sortable: true,
          style: "max-width: 150px"
        },
        {
          name: "gender",
          align: "center",
          label: "Gender",
          field: "gender",
          sortable: true
        },
        {
          name: "birthdate",
          label: "Birthdate",
          field: "birthdate",
          sortable: true
        },
        { name: "address", label: "Address", field: "address" },
        { name: "date_reg", label: "Date Registered", field: "date_reg" },
        { name: "actions", label: "Actions" }
      ]
    };
  },

  computed: {
    ...mapState("members", ["members"])
  },

  methods: {
    ...mapActions("members", ["addMember"]),

    openDialog() {
      this.member_dialog = true;
    },

    closeDialog() {
      this.member_dialog = false;
      this.member_form.reset();
    },

    saveNewMember() {
      this.addMember(this.member_form).then(() => {
        this.closeDialog();
      });
    }
  }
};
</script>
