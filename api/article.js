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

function fetchArticleDetail(slug) {
  return request({
    url: `/articles/${slug}`,
    method: 'GET',
  });
}

function fetchComments(slug) {
  return request({
    url: `/articles/${slug}/comments`,
    method: 'GET',
  });
}

function addComment(slug, body) {
  return request({
    url: `/articles/${slug}/comments`,
    method: 'POST',
    data: {
      comment: {
        body,
      },
    },
  });
}

function deleteComment(slug, id) {
  return request({
    url: `/articles/${slug}/comments/${id}`,
    method: 'DELETE',
  });
}

function createArticle({ title, description, body, tagList }) {
  return request({
    url: '/articles',
    method: 'POST',
    data: {
      article: {
        title,
        description,
        body,
        tagList,
      },
    },
  });
}

function updateArticle(slug, { title, description, body }) {
  return request({
    url: `/articles/${slug}`,
    method: 'PUT',
    data: {
      article: {
        title,
        description,
        body,
      },
    },
  });
}

function deleteArticle(slug) {
  return request({
    url: `/articles/${slug}`,
    method: 'DELETE',
  });
}

export {
  fetchArticles,
  fetchFeedArticles,
  addFavorateArticle,
  unFavorateArticle,
  fetchArticleDetail,
  fetchComments,
  addComment,
  deleteComment,
  createArticle,
  updateArticle,
  deleteArticle,
};
