import slash from 'slash2';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import pageRoutes from './router.config';
import webpackPlugin from './plugin.config';

const { title } = defaultSettings;
// preview.pro.ant.design only do not use in your production ;

const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: false,
      title: false,
      // title: {
      //   defaultTitle: title,
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

export default {
  plugins,
  // extraBabelPlugins: ['@babel/plugin-proposal-optional-chaining'],
  block: {
    // 国内用户可以使用码云
    // defaultGitUrl: 'https://gitee.com/ant-design/pro-blocks',
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    ie: 9,
  },
  devtool: false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: pageRoutes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': '#01b2b9',
    'border-radius-base': '2px',
    'tooltip-max-width': '400px',
    'tooltip-color': '#fff',
    // Tooltip background color
    'tooltip-bg': 'rgba(20, 28, 57, 0.8)',
    // Tooltip arrow color
    'tooltip-arrow-color': 'rgba(20, 28, 57, 0.8)',
    'layout-header-height': '60px',
  },
  define: {
    'process.env.AUTH': process.env.AUTH || 0,
    'process.env.API_HOST': process.env.API_HOST || 'http://192.168.1.253:8092',
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  proxy: {
    '/api': {
      // target: 'http://XXX',
      changeOrigin: true,
    },
  },
};
