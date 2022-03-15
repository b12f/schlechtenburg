import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vitePluginMd2Vue from 'vite-plugin-md2vue';

export default defineConfig({
  base: './',
  resolve: {
    dedupe: [ 'vue' ],
  },
  plugins: [
    vueJsx({}),
    vitePluginMd2Vue(),
  ],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  build: {
    sourcemap: true,
    outDir: 'docs',
  },
});
