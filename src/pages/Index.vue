<template>
  <q-page padding>
    <q-card class="my-card  q-mx-auto" flat style="max-width: 300px">
      <q-card-section class="text-center">
        <q-img alt="UCCP logo" src="/icons/uccp.png" width="100px" />
      </q-card-section>
      <q-card-section>
        <q-form @submit="login" class="q-gutter-md">
          <q-input
            v-model="login_form.username"
            label="Email or Username"
            rounded
            outlined
            dense
          />
          <q-input
            v-model="login_form.password"
            label="Password"
            rounded
            outlined
            dense
            :type="is_show ? 'text' : 'password'"
          >
            <template v-slot:append>
              <q-icon
                :name="is_show ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="is_show = !is_show"/></template
          ></q-input>
          <div class="text-center q-py-md q-px-sm">
            <q-btn
              type="submit"
              label="Log In"
              color="primary"
              class="full-width"
              rounded
            />
          </div>
          <div class="q-pa-md">
            <div class="text-subtitle2 text-red-5">{{ login_error.message }}</div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      is_show: false,
      login_form: new Form({
        username: "",
        password: ""
      })
    };
  },

  computed: {
    ...mapState('auth', ['login_error'])
  },

  methods: {
    ...mapActions("auth", ["loginUser"]),

    login() {
      this.loginUser(this.login_form);
    }
  }
};
</script>
