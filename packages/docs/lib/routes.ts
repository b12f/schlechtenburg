
export default [
  {
    path: '/',
    component: () => import('./Introduction').then(d => d.default),
  },
  {
    path: '/example',
    component: () => import('./Example').then(d => d.default),
  },
]
