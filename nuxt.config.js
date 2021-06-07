export default {
  server: {
    host: '0.0.0.0',
    port: 3000,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'yrw2',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/request.js', '@/plugins/time.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',

    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  router: {
    middleware: 'auth',
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      routes.push(
        ...[
          {
            path: '/home',
            name: 'Home',
            component: resolve(__dirname, './pages/index.vue'),
          },
          {
            path: '/register',
            name: 'Register',
            component: resolve(__dirname, './pages/login.vue'),
          },
        ]
      );
      return routes;
    },
  },
};
