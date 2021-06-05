import { request } from '@/plugins/request.js';

function fetchTags() {
  return request({
    url: '/tags',
    method: 'GET',
    data: {},
  });
}

export { fetchTags };
