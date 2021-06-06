<template>
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
    <template v-if="user && user.username === article.author.username">
      <nuxt-link
        class="btn btn-outline-secondary btn-sm"
        :to="`/editor/${article.slug}`"
        v-if="!deleting"
      >
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>

      <button
        class="btn btn-outline-danger btn-sm"
        :disabled="deleting"
        v-if="!needDeleteConfirm"
        @click="handleDeleteArticleClick"
      >
        <i class="ion-trash-a"></i> Delete Article
      </button>
      <span v-if="needDeleteConfirm">
        <button class="btn btn-sm btn-outline-secondary" @click="handleCancelDelete">cancel</button>
        <button class="btn btn-sm btn-outline-danger" @click="handleConfirmDelete">confirm</button>
      </span>
    </template>
    <template v-else>
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{ active: article.author.following }"
        :disabled="markingFollowStatus"
        @click="handleFollowClick"
      >
        <i class="ion-plus-round"></i>
        &nbsp; Follow {{ article.author.username }} <span class="counter">(10)</span>
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary" :class="{ active: article.favorited }">
        <i class="ion-heart"></i>
        &nbsp; Favorite Post <span class="counter">(29)</span>
      </button>
    </template>
  </div>
</template>

<script>
import { follow, unfollow } from '@/api/user.js';
import { deleteArticle } from '@/api/article.js';

export default {
  props: {
    article: Object,
    user: Object,
  },
  data() {
    return {
      markingFollowStatus: false,
      needDeleteConfirm: false,
      deleting: false,
    };
  },
  methods: {
    async handleFollowClick() {
      this.markingFollowStatus = true;
      const { author } = this.article;
      try {
        let res;
        if (author.following) {
          res = await unfollow(author.username);
        } else {
          res = await follow(author.username);
        }
        console.info(res);
        author.following = !author.following;
      } catch (e) {
        console.error(e);
      } finally {
        this.markingFollowStatus = false;
      }
    },
    handleDeleteArticleClick() {
      this.needDeleteConfirm = true;
    },
    handleCancelDelete() {
      this.needDeleteConfirm = false;
    },
    async handleConfirmDelete() {
      try {
        this.needDeleteConfirm = false;
        this.deleting = true;
        const res = await deleteArticle(this.article.slug);
        console.info(res);
        this.$router.push('/');
      } catch (e) {
        console.error(e);
      } finally {
        this.deleting = false;
      }
    },
  },
};
</script>

<style></style>
