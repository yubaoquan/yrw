import Vue from 'vue';
import dayjs from 'dayjs';

Vue.filter('date', (val, fmt = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(val).format(fmt);
});

export default function () {}
