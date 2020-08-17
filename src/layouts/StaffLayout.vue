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
      <div class="text-center q-pa-md">
        <q-avatar size="50px" square>
          <q-img src="icons/app_icons/profile.svg" />
        </q-avatar>
        <div class="text-weight-bold">{{ currentUser.name }}</div>
        <div>{{ currentUser.role }}</div>
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
            <q-avatar square size="25px">
              <q-img :src="route.icon" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            {{ route.name }}
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section class="text-red-8 text-bold">
            Log Out
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
import { mapState } from "vuex";
import { preFetch } from "quasar/wrappers";
export default {
  preFetch({ store }) {
    store.dispatch("members/getMembers");
    store.dispatch("marriages/getRecords");
    store.dispatch("baptismals/getBaptismalRecords");
    store.dispatch("events/getEvents");
  },

  data() {
    return {
      left: true,
      routes: [
        {
          name: "Dashboard",
          path: "/staff-dashboard",
          icon: "icons/app_icons/dashboard.svg"
        },
        {
          name: "Calendar Events",
          path: "/staff-calendar-events",
          icon: "icons/app_icons/calendar.svg"
        },
        {
          name: "Members",
          path: "/staff-members",
          icon: "icons/app_icons/group.svg"
        },
        {
          name: "Marriage",
          path: "/staff-marriage",
          icon: "icons/app_icons/wedding-rings.svg"
        },
        {
          name: "Baptism",
          path: "/staff-baptism",
          icon: "icons/app_icons/dove.svg"
        }
      ]
    };
  },

  computed: {
    ...mapState("auth", ["currentUser"])
  },

  mounted() {
    this.$router.push("/staff-dashboard");
  }
};
</script>
