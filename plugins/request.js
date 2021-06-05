import axios from 'axios';

const request = axios.create({
  baseURL: 'https://conduit.productionready.io/api',
});

export default function ({ store }) {
  request.interceptors.request.use(config => {
    const { user } = store.state.user;
    if (user) config.headers.Authorization = `Token ${user.token}`;
    return config;
  });
}
export { request };
