<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ formTitle }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else to="login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(value, prop) in errors">
              <li v-for="(message, index) in value" :key="index">{{ prop }}: {{ message }}</li>
            </template>
          </ul>

          <form @submit.prevent="handleSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                required
                v-model="user.name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                required
                minlength="8"
                v-model="user.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                required
                v-model="user.password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">{{ submitBtnTitle }}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user.js';
import { mapMutations } from 'vuex';

const Cookie = process.client && require('js-cookie');

export default {
  name: 'Login',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
      },
      errors: {},
    };
  },
  methods: {
    ...mapMutations('user', ['setUser']),
    handleSubmit() {
      return this.isLogin ? this.login() : this.register();
    },
    async login() {
      try {
        const { email, password } = this.user;
        const res = await login({ email, password });
        console.info(res);
        this.commonAfter(res.data.user);
      } catch (e) {
        console.error(e);
        this.errors = e.response?.data?.errors || this.errors;
      }
    },

    async register() {
      try {
        const { email, password, name: username } = this.user;
        const res = await register({ username, email, password });
        console.info(res);
        this.commonAfter(res.data.user);
      } catch (e) {
        console.error(e);
        this.errors = e.response?.data?.errors || this.errors;
      }
    },
    commonAfter(user) {
      Cookie.set('user', user);
      this.setUser(user);
      this.$router.push('/');
    },
  },
  computed: {
    isLogin() {
      return this.$route.name === 'login';
    },
    formTitle() {
      return this.isLogin ? 'Sign in' : 'Sign up';
    },
    submitBtnTitle() {
      return this.isLogin ? 'Sign in' : 'Sign up';
    },
  },
};
</script>
