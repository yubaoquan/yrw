<template>
  <div>
    <div class="article-preview" v-for="article in articles" :key="article.slug">
      <div class="article-meta">
        <nuxt-link :to="`/profile/${article.author.username}`"
          ><img :src="article.author.image"
        /></nuxt-link>
        <div class="info">
          <nuxt-link :to="`/profile/${article.author.username}`" class="author">{{
            article.author.username
          }}</nuxt-link>
          <span class="date">{{ article.createdAt | date('MMM DD YYYY') }}</span>
        </div>
        <button
          class="btn btn-outline-primary btn-sm pull-xs-right"
          :class="{ active: article.favorited }"
          :disabled="article.marking"
          @click="handleMarkArticle(article)"
        >
          <i class="ion-heart"></i> {{ article.favoritesCount }}
        </button>
      </div>
      <nuxt-link :to="`/article/${article.slug}`" class="preview-link">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: Array,
  },
  methods: {
    handleMarkArticle(article) {
      this.$emit('mark', { article });
    },
  },
};
</script>

<style></style>
