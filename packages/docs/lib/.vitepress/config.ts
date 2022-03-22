import { defineConfig } from 'vitepress';

const DOCS_PACKAGES = [
  'standalone',
  'core',
  'layout',
  'heading',
  'paragraph',
  'image',
];

export default defineConfig({
  title: 'Schlechtenburg',
  description: 'Experimental WYSIWYG block editor',

  base: '/schlechtenburg/',

  themeConfig: {
    nav: [
      {
        text: 'Guide',
        activeMatch: '^/guide/',
        link: '/guide/why'
      },
      {
        text: 'API',
        activeMatch: `^/api/`,
        items: DOCS_PACKAGES.map((name) => ({
          text: `@schlechtenburg/${name}`,
          link: `/api/@schlechtenburg/${name}`,
        })),
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          children: [
            { text: 'Why Schlechtenburg?', link: '/guide/why' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Examples', link: '/guide/examples' },
          ],
        }
      ],
      '/api/': [
        {
          text: 'API',
          children: DOCS_PACKAGES.map((name) => ({
            text: `@schlechtenburg/${name}`,
            link: `/api/@schlechtenburg/${name}`,
          })),
        }
      ],
      '/': false,
    },
  },
});
