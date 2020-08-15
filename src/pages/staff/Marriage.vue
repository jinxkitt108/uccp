<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        :data="records"
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
            <div class="text-h6 text-bold">Marriage Records</div>
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

    <!-- New Record Dialog -->
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
            <div class="row justify-between">
              <q-input
                v-model="record_form.serial_no"
                label="Serial No."
                style="width: 150px"
                dense
              />
            </div>
            <div class="row q-gutter-md justify-center">
              <q-input
                v-model="record_form.male_name"
                label="Male full name"
                style="width: 250px"
                dense
              />
              <q-input
                v-model="record_form.male_age"
                type="number"
                label="Age"
                dense
              />
            </div>
            <div class="row q-gutter-md justify-center">
              <q-input
                v-model="record_form.female_name"
                label="Female full name"
                style="width: 250px"
                dense
              />
              <q-input
                v-model="record_form.female_age"
                type="number"
                label="Age"
                dense
              />
            </div>
            <div class="row q-gutter-lg q-pa-lg justify-between">
              <q-input
                v-model="record_form.license_no"
                label="Marriage License No."
                dense
              />
              <q-input
                v-model="record_form.date_solemnized"
                type="date"
                hint="Date Solemnized"
                dense
              />
              <q-input
                v-model="record_form.date_issued"
                type="date"
                hint="Date Issued"
                dense
              />
            </div>
            <q-input
              v-model="record_form.place_issued"
              label="Place Issued"
              outlined
              dense
            />
            <div class="row q-gutter-lg q-pa-lg justify-between">
              <q-input
                v-model="record_form.solemnized_by"
                label="Solemnized by"
                dense
              />
              <q-input
                v-model="record_form.registry_no"
                label="Registry No."
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
        male_name: "",
        male_age: "",
        female_name: "",
        female_age: "",
        date_solemnized: "",
        license_no: "",
        date_issued: "",
        place_issued: "",
        registry_no: "",
        solemnized_by: ""
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
          name: "male_name",
          required: true,
          label: "Male Name",
          field: "male_name",
          align: "left",
          sortable: true,
          style: "max-width: 150px"
        },
        {
          name: "male_age",
          align: "center",
          label: "Age",
          field: "male_age",
          sortable: true
        },
        {
          name: "female_name",
          required: true,
          label: "Female Name",
          field: "female_name",
          align: "left",
          sortable: true,
          style: "max-width: 150px"
        },
        {
          name: "female_age",
          align: "center",
          label: "Age",
          field: "female_age",
          sortable: true
        },
        {
          name: "date_solemnized",
          label: "Date Solemnized",
          field: "date_solemnized",
          sortable: true
        },
        { name: "license_no", label: "License No.", field: "license_no" },
        { name: "date_issued", label: "Date Issued", field: "date_issued" },
        { name: "place_issued", label: "Place Issued", field: "place_issued" },
        { name: "registry_no", label: "Registry No.", field: "registry_no" },
        {
          name: "solemnized_by",
          label: "Solemnized by",
          field: "solemnized_by"
        },
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
    ...mapState("marriages", ["records"])
  },

  methods: {
    ...mapActions("marriages", ["addRecord", "updateRecord", "removeRecord"]),

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
