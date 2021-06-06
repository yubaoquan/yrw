<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <ArticleMeta :article="article" :user="user" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.html"></div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleMeta :article="article" :user="user" />
      </div>

      <div class="row">
        <Comments
          :comments="comments"
          :user="user"
          :slug="article.slug"
          @delete="handleCommentDelete"
          @update="fetchComments"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { fetchArticleDetail, fetchComments } from '@/api/article.js';
import { mapState } from 'vuex';
import ArticleMeta from '@/components/article-meta.vue';
import Comments from '@/components/comments.vue';
import MarkDownIt from 'markdown-it';

export default {
  name: 'ArticleDetail',
  components: { ArticleMeta, Comments },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description,
        },
      ],
    };
  },
  async asyncData({ route }) {
    const { slug } = route.params;
    const articleRes = await fetchArticleDetail(slug);
    const { article } = articleRes.data;
    const md = new MarkDownIt();
    article.html = md.render(article.body);
    return { article };
  },

  data() {
    return {
      article: {},
      comments: [],
    };
  },

  async mounted() {
    this.fetchComments();
  },

  methods: {
    async fetchComments() {
      try {
        const commentsRes = await fetchComments(this.article.slug);
        const md = new MarkDownIt();
        this.comments = commentsRes.data.comments.map(comment => {
          return {
            ...comment,
            html: md.render(comment.body),
          };
        });
      } catch (e) {
        console.error(e);
      }
    },
    handleCommentDelete(id) {
      const index = this.comments.findIndex(comment => comment.id === id);
      this.comments.splice(index, 1);
    },
  },
  computed: {
    ...mapState('user', {
      user: state => state.user,
    }),
  },
};
</script>

<style></style>
