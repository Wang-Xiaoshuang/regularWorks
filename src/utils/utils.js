import { parse } from 'querystring';
import CryptoJS from 'crypto-js';
import moment from 'moment';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

const key = CryptoJS.enc.Utf8.parse('liangzhikey@1021');
const iv = CryptoJS.enc.Utf8.parse('liangzhikey@1021');
// 缓存用户登陆信息
export function encrypt(data = '') {
  return CryptoJS.AES.encrypt(data, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv,
  }).toString(); // AES加密
  // let result = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(newData));
}

// moment日期格式转换
function transferMoment(direction, type, value) {
  if (!value) return null;
  if (direction === 'stm') {
    switch (type) {
      case 'year':
      default:
        return moment(value, 'YYYY');
    }
  } else {
    switch (type) {
      case 'year':
      default:
        return moment(value).format('YYYY');
      // return moment(value).format('YYYY-MM-DD')
    }
  }
}

const download = (res, setLoading) => {
  const repTitle = res.headers
    .get('content-disposition')
    ?.split(';')[1]
    ?.split('=')[1];
  const docTitle = repTitle ? decodeURIComponent(repTitle) : '压缩包';
  res.blob().then(blob => {
    create(blob, docTitle);
    if (setLoading) {
      setLoading(false);
    }
  });
  // });
};

function create(res, title) {
  if (res) {
    const url = window.URL.createObjectURL(new Blob([res]));
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}

export { transferMoment, download };
