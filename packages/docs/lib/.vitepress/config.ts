import { defineConfig } from 'vitepress';

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
        items: [
          { text: '@schlechtenburg/core', link: '/api/@schlechtenburg/core' },
        ],
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
            { text: 'Core', link: '/api/core' },
          ],
        }
      ],
      '/': false,
    },
  },
});
