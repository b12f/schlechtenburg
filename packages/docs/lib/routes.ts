export default [
  {
    name: 'home',
    path: '/',
    component: () => import('./pages/Introduction'),
  },
  {
    name: 'package',
    path: '/@schlechtenburg/:package',
    component: () => import('./pages/Package'),
  },
]
