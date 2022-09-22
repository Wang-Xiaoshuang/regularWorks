import { message } from 'antd';
import { router } from 'umi';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString = typeof str === 'undefined' ? localStorage.getItem('kexinToken') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return authority;
  }
  return authority || '';
}

export function setAuthority(authority = '') {
  return localStorage.setItem('kexinToken', authority);
}

export function goSubUrl(item, menuPermissionList) {
  if (menuPermissionList.includes(item.route) && item.url) {
    window.open(`${item.url}?token=getAuthority()`);
  }
}

export const authContext = {
  context: {},
};

export function loginOut() {
  setAuthority('');
  authContext.context = {};
}

export function checkIfAuth() {
  if (authContext?.context?.userId) {
    return true;
  }
  return false;
}

message.config({
  maxCount: 3,
  duration: 2,
  top: 60,
});

export function CheckText() {
  if (!checkIfAuth()) {
    return (
      <span style={{ color: 'red' }}>
        <a
          style={{ textDecoration: 'underline' }}
          className="lz-loginText"
          onClick={() => router.push('/user')}
        >
          登录
        </a>
        后查看更多内容
      </span>
    );
  }
  return null;
}
export function checkWithMessage() {
  return new Promise((resolve, reject) => {
    if (!checkIfAuth()) {
      message.warning({
        content: (
          <span>
            请
            <span className="lz-loginText" onClick={() => router.push('/user')}>
              登录
            </span>
            后查看更多内容
          </span>
        ),
      });
      reject();
    } else {
      resolve();
    }
  });
}
