/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout from '@ant-design/pro-layout';
import { useEffect } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
// import RightContent from './RightContent';
import styles from './basic.less';
/**
 * use Authorized check all menu item
 */
const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return localItem;
  });


const BasicLayout = props => {
  const { dispatch, children, settings } = props;
  /**
   * constructor
   */
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'settings/getSetting',
      });
    }
    if (dispatch && props.location.pathname !== '/home') {
      dispatch({
        type: 'global/changeIsUserFirst',
        payload: false,
      });
    }
  }, []);
 
  /**
   * init variables
   */
  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  return (
    <ProLayout
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        return <Link to={menuItemProps.path}>{defaultDom}</Link>
      }}
      footerRender={() => { }}
      menuDataRender={menuDataRender}
      menuHeaderRender={() => (
        <a href="/">
          <h1>
            <div className={styles.logo}></div>
          </h1>
        </a>
      )}
      {...props}
      {...settings}
      fixedHeader={false}
      logo={false}
      title={settings.title}
      className={styles.homeHeader}
      // rightContentRender={RightContent}
    >
      <div className={styles.banner}></div>
      <div className={styles.content}>{children}</div>
    </ProLayout>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
