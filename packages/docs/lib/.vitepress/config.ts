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
            { text: 'Introduction', link: '/guide/introduction' }
          ],
        }
      ],
      '/api/': [
        {
          text: 'API',
          children: [
            { text: 'Core', link: '/api/core' }
          ],
        }
      ],
    },
  },
});
