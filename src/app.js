import { getAuthority, authContext } from '@/utils/authority';
// let authRoutes = {};
// const router = require('umi/router');

// function filterRoute(menuList, routes) {
//   for (let i = 0; i < routes.length; i += 1) {
//     const { path } = routes[i];
//     if (path === '/') {
//       if (routes[i].routes) {
//         filterRoute(menuList, routes[i].routes);
//       }
//     } else if (menuList.indexOf(path) > -1) {
//       // 遍历子节点
//       if (routes[i].routes) {
//         filterRoute(menuList, routes[i].routes);
//       }
//     } else if (path && path !== '/user') {
//       // delete
//       routes.splice(i, 1);
//       i -= 1;
//     }
//   }
// }

// export function patchRoutes(routes) {
// const root = routes.find(v => v.path === '/');
// const keys = Object.keys(authRoutes).filter(v => !root.routes.find(p => p.name === v));
// const res = keys.map(k => {
//   return {
//     name: k,
//     routes: authRoutes[k].map(v => ({
//       name: v.name,
//       path: v.url || 'http://www.baidu.com',
//       disabled: true,
//     })),
//   };
// });
// const idx = root.routes.findIndex(v => !v.path);
// root.routes.splice(idx, 0, ...res);
// }

// const backToLogin = oldRender => {
//   window.g_app.model({ ...permissionModel, state: authRoutes });
//   router.push('/user/login');
//   oldRender();
// };

// function getAuth() {
//   return fetch('/api/user/assignPermission', {
//     method: 'get',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json; charset=utf-8',
//       Authorization: getAuthority(),
//     },
//   });
// }
export function render(oldRender) {
  // if (!getAuthority()) {
    oldRender();
  // }
  // getAuth()
  //   .then(res => res.json())
  //   .then(res => {
  //     const {
  //       header: { code },
  //     } = res;
  //     if (code === 200) {
  //       const { body } = res;
  //       authContext.context = body;
  //       // authRoutes = body;
  //     }
  //     oldRender();
  //   })
  //   .catch(() => {
  //     oldRender();
  //   });
}

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
    },
  },
};
