export default [
  {
    path: '/user',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Temp' },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/input/list',
      },
      {
        path: '/input',
        name: '送检数据输入',
        routes: [
          {
            path: '/input',
            redirect: '/input/list',
          },
          {
            path: '/input/list',
            component: './input',
          },
          {
            path: '/input/upload',
            component: './input/upload',
          },
          {
            path: '/input/check',
            component: './input/check',
          },
          {
            path: '/input/save',
            component: './input/save',
          },
        ],
      },
      {
        path: '/check',
        name: '内容检测管理',
        routes: [
          {
            path: '/check',
            redirect: '/check/list',
          },
          {
            path: '/check/list',
            component: './check',
          },
          {
            path: '/check/detail',
            component: './check/detail',
          },
          {
            path: '/check/detail/similar',
            component: './check/detail/similar',
          },
        ],
      },
      {
        path: '/manage',
        name: '对比库管理',
        routes: [
          {
            path: '/manage',
            redirect: '/manage/list',
          },
          {
            path: '/manage/list',
            component: './manage',
          },
          {
            path: '/manage/upload',
            component: './manage/upload',
          },
          {
            path: '/manage/check',
            component: './manage/check',
          },
          {
            path: '/manage/save',
            component: './manage/save',
          },
        ],
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
