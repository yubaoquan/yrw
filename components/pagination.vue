<template>
  <nav>
    <ul class="pagination">
      <li v-for="item in total" :key="item" class="page-item" :class="{ active: item === current }">
        <nuxt-link
          :to="{
            path: '/',
            query: {
              ...$route.query,
              page: item,
            },
          }"
          class="page-link ng-binding"
          href=""
          >{{ item }}</nuxt-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    total: Number,
    current: Number,
  },
};
</script>

<style></style>
