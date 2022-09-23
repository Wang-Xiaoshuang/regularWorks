export default {
  navTheme: 'light',
  layout: 'topmenu', //sidemenu
  contentWidth: 'Fluid',
  fixedHeader: true,
  autoHideHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: '项目', //由于title会被location上的query所影响，所以在basicLayout中
  iconfontUrl: '', //图标库 在header上引用时需要加上icon-前缀
};
