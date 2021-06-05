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

export { login, register };
