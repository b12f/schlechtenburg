
export default [
  {
    name: 'home',
    path: '/',
    component: () => import('./pages/Introduction').then(d => d.default),
  },
  {
    name: 'package',
    path: '/@schlechtenburg/:package',
    component: () => import('./pages/Package').then(d => d.default),
  },
]
