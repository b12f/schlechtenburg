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

  themeConfig: {
    nav: [
      {
        text: 'Guide',
        activeMatch: '^/guide/',
        link: '/guide/introduction'
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
            { text: 'Examples', link: '/guide/examples' },
            { text: 'Installation', link: '/guide/installation' },
          ],
        }
      ],
      '/api/': [
        {
          text: 'API',
          children: [
            { text: '@schlechtenburg/standalone', link: '/api/@schlechtenburg/standalone' },
            { text: '@schlechtenburg/core', link: '/api/@schlechtenburg/core' },
            { text: '@schlechtenburg/layout', link: '/api/@schlechtenburg/layout' },
            { text: '@schlechtenburg/heading', link: '/api/@schlechtenburg/heading' },
            { text: '@schlechtenburg/paragraph', link: '/api/@schlechtenburg/paragraph' },
            { text: '@schlechtenburg/image', link: '/api/@schlechtenburg/image' },
          ],
        }
      ],
      '/': false,
    },
  },
});
