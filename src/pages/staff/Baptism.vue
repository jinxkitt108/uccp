<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        :data="baptismal_records"
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
            <div class="text-h6 text-bold">Baptismal Records</div>
            <q-separator vertical />
            <q-btn
              @click="openDialog"
              label="Record"
              flat
              color="primary"
              style="border: 1px solid blue; border-style: dashed"
              icon="add"
            />
          </div>
        </template>
        <template v-slot:top-right>
          <q-input
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search for records"
          >
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
              @click="deleteRecord(props.row.id)"
              icon="delete"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- New Baptismal Record Dialog -->
    <q-dialog v-model="record_dialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6 text-center">
            {{ editMode ? "Edit Details" : "New Record Details" }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            @submit="editMode ? update() : saveNewRecord()"
            class="q-pa-md q-gutter-md"
          >
            <div class="row q-mb-sm">
              <q-input
                v-model="record_form.serial_no"
                label="Serial No."
                style="width: 150px"
                dense
              />
            </div>
            <div class="row justify-center">
              <q-input
                v-model="record_form.name"
                label="Full Name"
                style="width: 250px"
                dense
              />
            </div>
            <div class="row q-gutter-md justify-center">
              <q-input
                v-model="record_form.birthdate"
                type="date"
                hint="Date of Birth"
              />
              <q-checkbox
                v-model="record_form.gender"
                true-value="male"
                false-value="female"
                label="Male"
                color="primary"
              />
              <q-checkbox
                v-model="record_form.gender"
                true-value="female"
                 false-value="male"
                label="Female"
                color="primary"
              />
            </div>
            <q-input
              v-model="record_form.birthplace"
              label="Place of Birth"
              outlined
              dense
            />
            <div class="row q-gutter-lg q-pa-md justify-center">
              <q-input
                v-model="record_form.fathers_name"
                label="Father's Name"
                style="width: 250px"
                dense
              />
              <q-input
                v-model="record_form.mothers_name"
                label="Mother's Maiden Name"
                style="width: 250px"
                dense
              />
            </div>
            <q-input
              v-model="record_form.parents_address"
              label="Parent's Address"
              outlined
              dense
            />
            <div class="row">
              <q-input
                v-model="record_form.baptized_on"
                type="date"
                hint="Baptized on"
                dense
              />
            </div>
            <div class="row justify-end">
              <q-input
                v-model="record_form.baptized_by"
                label="Baptized by"
                style="width: 250px"
                dense
              />
            </div>
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
      record_dialog: false,
      filter: "",
      record_form: new Form({
        id: "",
        serial_no: "",
        name: "",
        birthdate: "",
        birthplace: "",
        gender: "",
        fathers_name: "",
        mothers_name: "",
        parents_address: "",
        baptized_on: "",
        baptized_by: ""
      }),
      columns: [
        {
          name: "serial_no",
          align: "center",
          label: "Serial No.",
          field: "serial_no",
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
          name: "birthdate",
          align: "center",
          label: "Date of Birth",
          field: "birthdate",
          sortable: true
        },
        {
          name: "birthplace",
          required: true,
          label: "Place of Birth",
          field: "birthplace",
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
          name: "fathers_name",
          label: "Father's Name",
          field: "fathers_name",
          sortable: true
        },
        {
          name: "mothers_name",
          label: "Mother's Maiden Name",
          field: "mothers_name"
        },
        {
          name: "parents_address",
          label: "Parent's Address",
          field: "parents_address"
        },
        { name: "baptized_on", label: "Baptized on", field: "baptized_on" },
        { name: "baptized_by", label: "Baptized by", field: "baptized_by" },
        { name: "actions", label: "Actions", align: "center" }
      ]
    };
  },

  watch: {
    record_dialog(val) {
      !val && this.record_form.reset();
    }
  },

  computed: {
    ...mapState("baptismals", ["baptismal_records"])
  },

  methods: {
    ...mapActions("baptismals", ["addRecord", "updateRecord", "removeRecord"]),

    async deleteRecord(id) {
      this.$q
        .dialog({
          title: "Confirm Delete",
          message: "Are you sure you want to delete the record?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.removeRecord(id).then(() => {
            this.$q.notify({
              message: "A record is successfully removed!",
              icon: "thumb_up",
              color: "positive"
            });
          });
        });
    },

    async update() {
      this.updateRecord(this.record_form).then(res => {
        this.closeDialog();
        this.$q.notify({
          message: "Record details successfully updated!",
          icon: "thumb_up",
          color: "positive"
        });
      });
    },

    edit(record) {
      this.editMode = true;
      this.record_form.id = record.id;
      this.record_form.fill(record);
      this.openDialog();
    },

    openDialog() {
      this.record_dialog = true;
    },

    closeDialog() {
      this.editMode = false;
      this.record_dialog = false;
      this.record_form.reset();
    },

    saveNewRecord() {
      this.addRecord(this.record_form).then(() => {
        this.closeDialog();
      });
    }
  }
};
</script>
