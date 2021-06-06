import { request } from '@/plugins/request.js';

function login(user) {
  return request({
    url: '/users/login',
    method: 'post',
    data: {
      user: {
        email: user.email,
        password: user.password,
      },
    },
  });
}

function register(user) {
  return request({
    url: '/users',
    method: 'post',
    data: {
      user: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    },
  });
}

function follow(username) {
  return request({
    url: `/profiles/${username}/follow`,
    method: 'POST',
  });
}

function unfollow(username) {
  return request({
    url: `/profiles/${username}/follow`,
    method: 'DELETE',
  });
}

function updateProfile({ email, username, password, bio, image } = {}) {
  return request({
    url: '/user',
    method: 'PUT',
    data: {
      user: {
        image,
        bio,
        email,
        username,
        password,
      },
    },
  });
}

function fetchProfile(username) {
  return request({
    url: `/profiles/${username}`,
    method: 'GET',
  });
}

export { login, register, follow, unfollow, updateProfile, fetchProfile };
