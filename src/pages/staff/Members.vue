<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        :data="members"
        :columns="columns"
        row-key="id"
        :filter="filter"
        no-data-label="Failed to load it might be internet connection issue."
        no-results-label="Search result found nothing."
      >
        <template v-slot:no-data="{ icon, message, filter }">
          <div class="q-mx-auto text-subtitle q-pa-md q-gutter-sm">
            <q-banner rounded class="bg-grey-2">
              <span>{{ message }}</span>
              <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
            </q-banner>
          </div>
        </template>
        <template v-slot:top-left>
          <div class="row q-gutter-md">
            <div class="text-h6 text-bold">Member Records</div>
            <q-separator vertical />
            <q-btn
              @click="openDialog"
              label="Member"
              flat
              color="primary"
              style="border: 1px solid blue; border-style: dashed"
              icon="add"
            />
          </div>
        </template>
        <template v-slot:top-right>
          <q-input dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              dense
              round
              flat
              color="grey"
              @click="edit(props.row)"
              icon="edit"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              color="grey"
              @click="deleteMember(props.row.id)"
              icon="delete"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- New Member Dialog -->
    <q-dialog v-model="member_dialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6 text-center">
            {{ editMode ? "Edit Details" : "New Member Details" }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            @submit="editMode ? update() : saveNewMember()"
            class="q-pa-md q-gutter-md"
          >
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
            <div class="row q-pa-sm justify-end q-gutter-md">
              <q-btn flat @click="closeDialog" label="Cancel" />
              <q-btn
                type="submit"
                color="primary"
                :label="editMode ? 'Update' : 'Save'"
              />
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
      editMode: false,
      member_dialog: false,
      filter: "",
      member_form: new Form({
        id: "",
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
        { name: "actions", label: "Actions", align: "center" }
      ]
    };
  },

  watch: {
    member_dialog(val) {
      !val && this.member_form.reset();
    }
  },

  computed: {
    ...mapState("members", ["members"])
  },

  methods: {
    ...mapActions("members", ["addMember", "updateMember", "removeMember"]),

    async deleteMember(id) {
      this.$q
        .dialog({
          title: "Confirm Delete",
          message: "Are you sure you want to delete the member?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.removeMember(id).then(() => {
            this.$q.notify({
              message: "A member is successfully removed!",
              icon: "thumb_up",
              color: "positive"
            });
          });
        });
    },

    async update() {
      this.updateMember(this.member_form).then(res => {
        this.closeDialog();
        this.$q.notify({
          message: "Member details successfully updated!",
          icon: "thumb_up",
          color: "positive"
        });
      });
    },

    edit(member) {
      this.editMode = true;
      this.member_form.id = member.id;
      this.member_form.fill(member);
      this.openDialog();
    },

    openDialog() {
      this.member_dialog = true;
    },

    closeDialog() {
      this.editMode = false;
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
