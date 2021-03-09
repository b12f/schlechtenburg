import vueJsx from '@vitejs/plugin-vue-jsx';

export default {
  base: './',
  plugins: [
    vueJsx({}),
  ],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  build: {
    sourcemap: true,
  },
};
