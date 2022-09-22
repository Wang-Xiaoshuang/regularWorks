import { router } from 'umi';
import { Dropdown, Menu } from 'antd';

import { authContext, loginOut } from '@/utils/authority';
import IconFont from '@/components/Icon';

const menuHeaderDropdown = (
  <Menu>
    <Menu.Item
      key="logout"
      onClick={() => {
        loginOut();
        router.push('/user');
      }}
    >
      退出登录
    </Menu.Item>
  </Menu>
);

function RightContent() {
  if (authContext?.context?.userId) {
    return (
      <Dropdown overlay={menuHeaderDropdown} overlayStyle={{ width: 150 }}>
        <div
          style={{ color: '#ffffffcc', cursor: 'pointer', textAlign: 'center', paddingRight: 10 }}
        >
          <IconFont
            type="iconyonghu"
            style={{ fontSize: 16, verticalAlign: -3, borderRadius: '50%', border: '1px solid' }}
          />
          &nbsp;欢迎您，{authContext?.context?.username}
        </div>
      </Dropdown>
    );
  }
  return (
    <div style={{ color: '#ffffffe6', cursor: 'pointer' }} onClick={() => router.push('/user')}>
      <IconFont type="iconyonghu" style={{ fontSize: 16, marginRight: 6, verticalAlign: -3 }} />
      登录
    </div>
  );
}

export default RightContent;
