<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <div class="tag-list">
      <nuxt-link
        :to="{
          path: '/',
          query: { tab: 'tag', tag },
        }"
        class="tag-pill tag-default"
        v-for="(tag, index) in meaningfulTags"
        :key="index"
        >{{ tag }}</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tags: Array,
  },
  computed: {
    /** 过滤掉不可见字符 */
    meaningfulTags() {
      return this.tags.filter(tag => !/[^\u0000-\u007E]/.test(tag));
    },
  },
};
</script>

<style></style>
