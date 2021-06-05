<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'your_feed' }"
                  :to="{
                    path: '/',
                    query: { tab: 'your_feed' },
                  }"
                  exact
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'global_feed' }"
                  :to="{
                    path: '/',
                    query: { tab: 'global_feed' },
                  }"
                  exact
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link active"
                  :to="{
                    path: '/',
                    query: { tab: 'tag', tag },
                  }"
                  exact
                  >#{{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <Articles :articles="articles" @mark="handleMarkArticle" />
        </div>

        <div class="col-md-3">
          <Tags :tags="tags" />
        </div>
      </div>

      <Pagination :total="totalPages" :current="page" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  fetchArticles,
  fetchFeedArticles,
  addFavorateArticle,
  unFavorateArticle,
} from '@/api/article.js';
import { fetchTags } from '@/api/tag.js';
import Articles from '@/components/articles.vue';
import Tags from '@/components/tags.vue';
import Pagination from '@/components/pagination.vue';

export default {
  components: { Articles, Tags, Pagination },
  async asyncData({ query, store }) {
    try {
      const limit = 10;
      const page = +query.page || 1;
      const { tag, tab } = query;
      const offset = (page - 1) * limit;
      const articlesTask =
        tab === 'your_feed' && store.state.user.user
          ? fetchFeedArticles({ limit, offset })
          : fetchArticles({ limit, offset, tag });
      const [articlesTaskResult, tagsTask] = await Promise.allSettled([articlesTask, fetchTags()]);

      const articlesRes = articlesTaskResult.value || { data: { articles: [], articlesCount: 0 } };
      const tagsRes = tagsTask.value || { data: { tags: [] } };
      const { articles, articlesCount } = articlesRes.data;
      return {
        articles: articles.map(item => ({ ...item, marking: false })),
        articlesCount,
        limit,
        page,
        tags: tagsRes.data.tags,
      };
    } catch (e) {
      console.error(e);
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  data() {
    return {
      articles: [],
      tags: [],
      page: 1,
    };
  },
  methods: {
    async handleMarkArticle({ article }) {
      try {
        console.info(article.marking);
        if (article.marking) return;
        article.marking = true;
        const task = article.favorited
          ? unFavorateArticle(article.slug)
          : addFavorateArticle(article.slug);
        const res = await task;
        console.info(res);
        article.favorited = !article.favorited;
        article.favoritesCount += article.favorited ? 1 : -1;
      } catch (e) {
        console.error(e);
      } finally {
        article.marking = false;
      }
    },
  },
  computed: {
    ...mapState('user', {
      user: state => state.user,
    }),
    totalPages() {
      const { articlesCount, limit } = this;
      return Math.ceil(articlesCount / limit);
    },
    tag() {
      return this.$route.query.tag;
    },
    tab() {
      return this.$route.query.tab || 'global_tab';
    },
  },
};
</script>

<!-- eslint-disable max-len -->
<style scoped></style>
