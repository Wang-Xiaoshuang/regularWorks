export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/input',
        name: '送检数据输入',
        // routes: [
        //   {
        //     path: '/input',
        //     redirect: '/input/list',
        //   },
        //   {
        //     path: '/input/list',
        //     component: './input',
        //   },
        // ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
