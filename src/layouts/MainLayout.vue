<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="/icons/uccp.png">
          </q-avatar>
          UCCP-San Carlos
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <div class="column q-pa-sm flex-center">
        <div class="text-subtitle2">UNITED CHRISTIAN CHURCH OF THE PHILIPPINES</div>
        <div class="text-caption">San Carlos City, Negros Occidental, Philippines</div>
        <div class="text-caption">This is the management system of UCCP-San Carlos</div>
      </div>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
