<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="handleSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="title"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="desc"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="body"
                  required
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  :disabled="isEdit"
                  v-model="tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" :disabled="submitting">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, updateArticle, fetchArticleDetail } from '@/api/article.js';

export default {
  name: 'ArticleEdit',
  data() {
    return {
      title: '',
      desc: '',
      body: '',
      tags: '',
      submitting: false,
    };
  },
  mounted() {
    if (this.isEdit) this.fetchArticle();
  },
  methods: {
    async fetchArticle() {
      const { slug } = this.$route.params;
      const articleRes = await fetchArticleDetail(slug);
      const { article } = articleRes.data;
      if (article) {
        this.title = article.title;
        this.desc = article.description;
        this.body = article.body;
        this.tags = article.tagList.join(',');
      } else {
        // eslint-disable-next-line no-alert
        alert('Article Not Found');
        this.$router.push('/');
      }
    },

    async handleSubmit() {
      try {
        this.submitting = true;
        const { title, desc, body, tags } = this;
        const task = this.isEdit
          ? this.updateArticle({ title, desc, body })
          : this.createArticle({ title, desc, body, tags });
        await task;
      } catch (e) {
        console.error(e);
      } finally {
        this.submitting = false;
      }
    },
    async updateArticle({ title, desc, body }) {
      try {
        const res = await updateArticle(this.$route.params.slug, {
          title,
          description: desc,
          body,
        });
        console.info(res);
        const { slug } = res.data.article;
        this.$router.push(`/article/${slug}`);
      } catch (e) {
        console.error(e);
      }
    },
    async createArticle({ title, desc, body, tags }) {
      try {
        const tagList = tags.split(',').map(tag => tag.trim());
        const res = await createArticle({ title, description: desc, body, tagList });
        console.info(res);
        const { slug } = res.data.article;
        this.$router.push(`/article/${slug}`);
      } catch (e) {
        console.error(e);
      }
    },
  },
  computed: {
    isEdit() {
      return this.$route.params.slug;
    },
  },
};
</script>

<style></style>
