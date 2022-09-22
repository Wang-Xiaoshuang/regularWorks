/* eslint-disable max-len */
import { useState } from 'react';
import SystemDatabase from './partPage/systemDatabase';
import MyDatabase from './partPage/myDatabase';

export default () => {
  const [tab, setTab] = useState('系统数据库')

  return (
    <div className="duplicate_page">
      {
        tab === '系统数据库' ?
          <SystemDatabase setTab={setTab} />
          :
          <MyDatabase setTab={setTab} />
      }
    </div>
  );
};
