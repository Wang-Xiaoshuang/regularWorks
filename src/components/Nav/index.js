import React from 'react';
import { router } from 'umi';
import styles from './index.less';

export default props => {
  const { data } = props;

  const onclick = i => {
    if (i.link) {
      if (i.link === 'back') {
        router.goBack();
      } else {
        router.push(i.link);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      {data.map((i, index) => {
        if (index !== data.length - 1) {
          return (
            <span className={styles.grey} onClick={() => onclick(i)}>
              {i.name}
            </span>
          );
        }
        return <span onClick={() => onclick(i)}>{i.name}</span>;
      })}
    </div>
  );
};
