import vueJsx from '@vitejs/plugin-vue-jsx';

export default {
  base: '/schlechtenburg/',
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
