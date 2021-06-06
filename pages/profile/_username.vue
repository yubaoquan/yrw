<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <nuxt-link
              v-if="isSelf"
              class="btn btn-sm btn-outline-secondary action-btn"
              to="/settings"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
            <button
              v-else
              class="btn btn-sm btn-outline-secondary action-btn"
              :disabled="markingFollowStatus"
              @click="handleFollowClick"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ profile.following ? 'Unfollow' : 'Follow' }} {{ profile.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" @click="handleTabClick('my')">
                <span class="nav-link" :class="{ active: tab === 'my' }">My Articles</span>
              </li>
              <li class="nav-item" @click="handleTabClick('favorited')">
                <span class="nav-link" :class="{ active: !tab || tab === 'favorited' }"
                  >Favorited Articles</span
                >
              </li>
            </ul>
          </div>

          <Articles :articles="articles[tab]" @mark="handleMarkArticle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchProfile, follow, unfollow } from '@/api/user.js';
import { fetchArticles, addFavorateArticle, unFavorateArticle } from '@/api/article.js';

import { mapState } from 'vuex';
import Articles from '@/components/articles.vue';

export default {
  name: 'Profile',
  components: { Articles },
  data() {
    return {
      profile: {
        bio: '',
        following: false,
        image: '',
        username: this.$route.params.username,
      },
      tab: 'my',
      articles: {
        my: [],
        favorited: [],
      },
      markingFollowStatus: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.profile = {
        bio: '',
        following: false,
        image: '',
        username: this.$route.params.username,
      };
      this.tab = 'my';
      this.articlcs = {
        my: [],
        favorited: [],
      };
      await this.fetchProfile();
      this.fetchArticles();
    },
    async fetchProfile() {
      try {
        const res = await fetchProfile(this.$route.params.username);
        console.info(res.data);
        this.profile = res.data.profile;
      } catch (e) {
        console.error(e);
      }
    },
    handleTabClick(tab) {
      this.tab = tab;
    },
    async fetchArticles() {
      try {
        const { username } = this.profile;
        const params = this.tab === 'my' ? { author: username } : { favorited: username };
        const res = await fetchArticles(params);
        this.articles[this.tab] = res.data.articles.map(article => {
          return {
            ...article,
            marking: false,
          };
        });
      } catch (e) {
        console.error(e);
      }
    },
    async handleMarkArticle({ article }) {
      try {
        if (article.marking) return;
        article.marking = true;
        const task = article.favorited
          ? unFavorateArticle(article.slug)
          : addFavorateArticle(article.slug);
        const res = await task;
        article.favorited = !article.favorited;
        article.favoritesCount += article.favorited ? 1 : -1;
      } catch (e) {
        console.error(e);
      } finally {
        article.marking = false;
      }
    },
    async handleFollowClick() {
      this.markingFollowStatus = true;
      const { profile } = this;
      try {
        let res;
        if (profile.following) {
          res = await unfollow(profile.username);
        } else {
          res = await follow(profile.username);
        }
        console.info(res);
        profile.following = !profile.following;
      } catch (e) {
        console.error(e);
      } finally {
        this.markingFollowStatus = false;
      }
    },
  },
  computed: {
    ...mapState('user', {
      user: state => state.user,
    }),
    isSelf() {
      const { profile, user } = this;
      return profile.username === user?.username;
    },
  },
  watch: {
    tab(v) {
      console.info(v);
      this.fetchArticles();
    },
    '$route.params.username'() {
      this.init();
    },
  },
};
</script>
