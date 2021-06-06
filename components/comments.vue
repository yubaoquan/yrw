<template>
  <div class="col-xs-12 col-md-8 offset-md-2">
    <form class="card comment-form" @submit.prevent="handleSubmit" v-if="user">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="myComment"
          required
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" :disabled="submitting">Post Comment</button>
      </div>
    </form>

    <template v-for="comment in comments">
      <form
        class="card comment-form"
        v-if="currentComment === comment && isEdit"
        :key="comment.id"
        @submit.prevent="handleUpdateSubmit"
      >
        <div class="card-block">
          <textarea
            class="form-control"
            placeholder="Write a comment..."
            rows="3"
            v-model="currentCommentContent"
            required
          ></textarea>
        </div>
        <div class="card-footer">
          <img :src="user.image" class="comment-author-img" />
          <button @click="handleCancelUpdateClick" :disabled="updating">cancel</button>
          <button class="btn btn-sm btn-primary" :disabled="updating">Update Comment</button>
        </div>
      </form>

      <div v-else class="card" :key="comment.id">
        <div class="card-block">
          <p class="card-text" v-html="comment.html"></p>
        </div>
        <div class="card-footer">
          <nuxt-link :to="`/profile/${comment.author.username}`" class="comment-author">
            <img :src="comment.author.image" class="comment-author-img" />
          </nuxt-link>
          &nbsp;
          <nuxt-link :to="`/profile/${comment.author.username}`" class="comment-author">{{
            comment.author.username
          }}</nuxt-link>
          <span class="date-posted">{{ comment.createdAt | date }}</span>
          <span class="mod-options" v-if="comment.author.username === (user && user.username)">
            <i class="ion-edit" @click="handleEditClick(comment)"></i>
            <i class="ion-trash-a" @click="handleDeleteClick(comment)"></i>
            <span v-if="needDeleteConfirm">
              <button @click="handleDeleteConfirm">confirm delete</button>
              <button @click="handleDeleteCancel">cancel</button>
            </span>
          </span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { addComment, deleteComment } from '@/api/article.js';

export default {
  props: {
    comments: Array,
    user: Object,
    slug: String,
  },
  data() {
    return {
      myComment: '',
      submitting: false,
      needDeleteConfirm: false,
      currentComment: null,
      currentCommentContent: '',
      isEdit: false,
      updating: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.submitting = true;
        const res = await addComment(this.slug, this.myComment);
        console.info(res);
        this.$emit('update');
      } catch (e) {
        console.error(e);
      } finally {
        this.submitting = false;
      }
    },
    async handleUpdateSubmit() {
      try {
        this.updating = true;
        // eslint-disable-next-line no-alert
        alert('API not found');
      } catch (e) {
        console.error(e);
      } finally {
        this.updating = false;
        this.isEdit = false;
      }
    },
    handleEditClick(comment) {
      this.currentComment = comment;
      this.currentCommentContent = comment.body;
      this.isEdit = true;
    },
    handleCancelUpdateClick() {
      this.isEdit = false;
    },
    handleDeleteClick(comment) {
      this.currentComment = comment;
      this.needDeleteConfirm = true;
    },
    async handleDeleteConfirm() {
      try {
        const res = await deleteComment(this.slug, this.currentComment.id);
        console.info(res);
        this.$emit('delete', this.currentComment.id);
      } catch (e) {
        console.error(e);
      }
    },
    handleDeleteCancel() {
      this.needDeleteConfirm = false;
    },
  },
};
</script>

<style></style>
