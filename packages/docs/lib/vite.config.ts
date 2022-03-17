import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  resolve: {
    dedupe: [
      'vue',
      '@schlechtenburg/core',
      '@schlechtenburg/layout',
      '@schlechtenburg/heading',
      '@schlechtenburg/paragraph',
      '@schlechtenburg/image',
    ],
  },

  plugins: [
    vueJsx({}),
  ],

  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
});
