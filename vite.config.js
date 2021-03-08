import vueJsx from '@vitejs/plugin-vue-jsx';

export default {
  plugins: [
    vueJsx({}),
  ],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  build: {
    outDir: 'docs',
  },
};
