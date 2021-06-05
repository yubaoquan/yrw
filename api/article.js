import { request } from '@/plugins/request.js';

function fetchArticles({ tag, author, favorited, limit, offset } = {}) {
  return request({
    url: '/articles',
    method: 'GET',
    params: { tag, author, favorited, limit, offset },
  });
}

function fetchFeedArticles({ limit, offset }) {
  return request({
    url: '/articles/feed',
    method: 'GET',
    params: { limit, offset },
  });
}

function addFavorateArticle(slug) {
  return request({
    url: `/articles/${slug}/favorite`,
    method: 'POST',
  });
}

function unFavorateArticle(slug) {
  return request({
    url: `/articles/${slug}/favorite`,
    method: 'DELETE',
  });
}

export { fetchArticles, fetchFeedArticles, addFavorateArticle, unFavorateArticle };
