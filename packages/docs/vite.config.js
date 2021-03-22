import vueJsx from '@vitejs/plugin-vue-jsx';

export default {
  base: './',
  resolve: {
    dedupe: [ 'vue' ],
  },
  plugins: [
    vueJsx({}),
  ],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  build: {
    sourcemap: true,
    outDir: 'docs',
  },
};
