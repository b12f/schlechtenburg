import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vitePluginMd2Vue from 'vite-plugin-md2vue';
import viteTSConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  root: './',
  base: './',
  resolve: {
    dedupe: [ 'vue' ],
  },
  plugins: [
    vueJsx({}),
    vitePluginMd2Vue(),
    viteTSConfigPaths(),
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
