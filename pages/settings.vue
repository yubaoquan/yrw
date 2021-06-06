<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="handleSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  required
                  v-model="username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  required
                  v-model="email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  minlength="8"
                  required
                  v-model="password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" :disabled="submitting">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" type="button" @click="handleLogoutClick">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { updateProfile, fetchProfile } from '@/api/user.js';

const Cookie = process.client && require('js-cookie');

export default {
  name: 'Settings',
  data() {
    console.info('data method');

    return {
      username: '',
      image: '',
      bio: '',
      email: '',
      password: '',
      submitting: false,
    };
  },
  mounted() {
    console.info(this.user);
    this.initData();
  },
  methods: {
    ...mapMutations('user', ['setUser']),
    async initData() {
      const { username, email } = this.user;
      const res = await fetchProfile(this.user.username);
      const { profile } = res.data;
      this.username = username;
      this.image = profile.image;
      this.bio = profile.bio;
      this.email = email;
    },
    async handleSubmit() {
      console.info('submit');
      try {
        this.submitting = true;
        const { username, image, bio, email, password } = this;

        const res = await updateProfile({
          username,
          image,
          bio,
          email,
          password,
        });

        console.info(res.data);

        this.$router.push(`/profile/${username}`);
      } catch (e) {
        console.error(e);
        console.info(e);
      } finally {
        this.submitting = false;
      }
    },
    async handleLogoutClick() {
      try {
        Cookie.remove('user');
        this.setUser(null);
        this.$router.push('/');
      } catch (e) {
        console.error(e);
      }
    },
  },
  computed: {
    ...mapState('user', {
      user: state => state.user || {},
    }),
  },
};
</script>

<style></style>
