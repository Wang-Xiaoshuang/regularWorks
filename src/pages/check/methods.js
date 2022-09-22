import { deleteData, start, stop, getCondition } from './services';

function confirm(id, updateList) {
  deleteData({ id }).then(() => {
    updateList();
  });
}

const startcheck = (id, updateList, callback) => {
  start({ id }).then(() => {
    updateList();
    callback();
  });
};

const stopcheck = (id, updateList) => {
  stop({ id }).then(() => {
    updateList();
  });
};

const condition = (id, setModal, modalControl, setConditionData) => {
  getCondition({ id }).then(res => {
    if (res) {
      setConditionData(res);
      setModal({ ...modalControl, conditionModal: true });
    }
  });
};

const output = (checkId, docIdList, exportTypeList) => {
  fetch(
    `/api/check/export?checkId=${checkId}&docIdList=${docIdList}&exportTypeList=${exportTypeList}`,
    {
      method: 'GET',
      credentials: 'omit',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    },
  ).then(res => {
    const repTitle = res.headers
      .get('content-disposition')
      ?.split(';')[1]
      ?.split('=')[1];
    const docTitle = repTitle ? decodeURIComponent(repTitle) : '压缩包';
    res.blob().then(blob => download(blob, docTitle));
  });
};

function download(res, title) {
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

const pageConfig = length => {
  return {
    total: length,
    pageSize: 10,
    showSizeChanger: false,
    showQuickJumper: true,
    showTotal: t => (
      <span>
        共<strong style={{ color: '#01B2B9' }}>{t}</strong>条
      </span>
    ),
    position: ['bottomCenter'],
  };
};

export { confirm, startcheck, stopcheck, output, pageConfig, condition };
