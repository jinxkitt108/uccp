<template>
  <q-page padding>
    <q-table
      :data="users"
      :columns="columns"
      :row-key="users.id"
      :filter="filter"
    >
    <template v-slot:top-right>
      <q-input label="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:top-left>
     <div class="text-h5">Users</div>
    </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      filter: "",
      columns: [
        {
          name: "name",
          align: "center",
          label: "Name",
          field: "name",
          classes: "bg-grey-2 ellipsis",
          headerClasses: "bg-primary text-white"
        },
        {
          name: "email",
          align: "center",
          label: "Email",
          field: "email",
        },
        {
          name: "username",
          align: "center",
          label: "Username",
          field: "username",
        },
        {
          name: "role",
          align: "center",
          label: "Role",
          field: "role",
        },
        { name: "actions", label: "Actions" }
      ]
    };
  },

  computed: {
    ...mapState('users', ['users'])
  }
};
</script>
