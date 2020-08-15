<template>
  <q-page padding>
    <div class="text-h5">Dashboard</div>
    <div class="row q-pa-md q-gutter-md">
      <q-card class="members-card text-white q-px-lg">
        <q-card-section>
          <div>
            <q-icon name="account_circle" style="font-size: 50px" />
          </div>
          <div class="text-h6">Members<span class="q-ml-md text-bold">{{ members.length }}</span></div>
        </q-card-section>
      </q-card>
      <q-card class="marriages-card text-white q-px-lg">
        <q-card-section>
          <div>
            <q-icon name="loyalty" style="font-size: 50px" />
          </div>
          <div class="text-h6">Marriage<span class="q-ml-md text-bold">{{ records.length }}</span></div>
        </q-card-section>
      </q-card>
      <q-card class="baptismal-card text-white q-px-lg">
        <q-card-section>
          <div>
            <q-icon name="note" style="font-size: 50px" />
          </div>
          <div class="text-h6">Baptismal<span class="q-ml-md text-bold">{{ baptismal_records.length }}</span></div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("members", ["members"]),
    ...mapState("marriages", ["records"]),
    ...mapState("baptismals", ["baptismal_records"])
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
background: rgb(190,6,195);
background: linear-gradient(310deg, rgba(190,6,195,1) 27%, rgba(223,50,213,1) 57%, rgba(208,11,197,1) 100%);
}
.baptismal-card {
background: rgb(11,145,139);
background: linear-gradient(310deg, rgba(11,145,139,1) 30%, rgba(5,121,116,1) 57%, rgba(11,142,119,1) 100%);
}
</style>
