<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <img src="/icons/uccp.png" />
          </q-avatar>
          UCCP-SCC
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" bordered>
      <div class="text-center q-py-md">
        <div class="">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Razvan Stoenescu</div>
          <div>@rstoenescu</div>
        </div>
      </div>
      <q-separator />
      <q-list padding>
        <q-item
          v-for="(route, index) in routes"
          :key="index"
          clickable
          v-ripple
          :to="route.path"
        >
          <q-item-section avatar>
            <q-icon :name="route.icon" />
          </q-item-section>

          <q-item-section>
            {{ route.name }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { preFetch } from "quasar/wrappers";
export default {
  preFetch({ store }) {
    store.dispatch("members/getMembers");
  },

  data() {
    return {
      left: true,
      routes: [
        { name: "Dashboard", path: "/staff-dashboard", icon: "dashboard" },
        { name: "Members", path: "/staff-members", icon: "group" }
      ]
    };
  },

  mounted() {
    this.$router.push("/staff-dashboard");
  }
};
</script>
