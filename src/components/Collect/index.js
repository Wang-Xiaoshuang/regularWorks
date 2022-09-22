/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { Button, Popconfirm } from 'antd';
// import moment from 'moment';

import { useRequest } from 'ahooks';
import { postFocus, postNoFocus } from '@/services/home';
import IconFont from '../Icon';

export default ({ item = {}, field = '人才库', otherOpt = {}, onCancel, type = 'default' }) => {
  const [, setRefresh] = useState('');
  const { run: deleteFocus } = useRequest(
    params =>
      postNoFocus({
        docId: params.docId || params.id,
      }),
    {
      manual: true,
      onSuccess: () => {
        // eslint-disable-next-line no-param-reassign
        item.isCollect = 0;
        setRefresh(Math.random());
        if (onCancel) onCancel();
      },
    },
  );
  const { run: focus } = useRequest(
    params => {
      let p = {
        docId: params.docId || params.id,
        field,
        id: 0,
        isValid: 0,
        ...otherOpt,
      };
      if (field !== '人才库') {
        p = {
          ...p,
          publishTime: params.publish_date,
          title: params.title,
          type: params.type,
          url: params.origin_url,
        };
      }
      return postFocus(p);
    },
    {
      manual: true,
      onSuccess: () => {
        // eslint-disable-next-line no-param-reassign
        item.isCollect = 1;
        setRefresh(Math.random());
      },
    },
  );
  return item?.isCollect === 1 ? (
    <Popconfirm
      placement="topRight"
      title="确定取消收藏吗，取消收藏后将不在收藏列表展示？"
      onConfirm={() => {
        deleteFocus(item);
      }}
      okText="确定"
      cancelText="取消"
    >
      {type === 'button' ? (
        <Button type="primary" ghost className="hasCollect">
          <IconFont type="iconwujiaoxing-mianxing" />
          已收藏
        </Button>
      ) : (
        <div className="lz-collect hasCollect">
          <IconFont type="iconwujiaoxing-mianxing" />
          已收藏
        </div>
      )}
    </Popconfirm>
  ) : type === 'button' ? (
    <Button
      className="lz-collect"
      onClick={() => {
        focus(item);
      }}
    >
      <IconFont type="iconwujiaoxing-mianxing" />
      收藏
    </Button>
  ) : (
    <div
      className="lz-collect"
      onClick={() => {
        focus(item);
      }}
    >
      <IconFont type="iconwujiaoxing-mianxing" />
      收藏
    </div>
  );
};
