import { useState } from 'react';
import { Radio } from 'antd';
import styles from './index.less';

const typeClassMap = {
  menuTab: 'menuTab',
  subTab: 'subTab',
};

const defaultOptions = [
  { label: '企业', value: 'company' },
/*   { label: '产品', value: 'product' }, */
  { label: '人才', value: 'talent' },
  { label: '专利', value: 'patent' },
  { label: '论文', value: 'thesis' },
];

export default ({ children, lzType, className, noGap, ...rest }) => {
  const { onChange, defaultValue, options = defaultOptions, value } = rest;
  const [selectedTab, changeTab] = useState(
    'defaultValue' in rest ? defaultValue : options[0].value,
  );

  function tabClick(item) {
    const lastValue = 'value' in rest ? value : selectedTab;
    if (item.value === lastValue) return;
    if (!('value' in rest)) changeTab(item.value);
    if (onChange) onChange(item);
  }

  if (lzType) {
    const classNameInner = styles[typeClassMap[lzType]] || 'menuTab';
    const showValue = 'value' in rest ? value : selectedTab;
    return (
      <div className={className ? `${classNameInner} ${className}` : `${classNameInner}`}>
        {options.map(item => (
          <div
            key={item.value}
            style={noGap ? { marginLeft: 0 } : null}
            className={(() => {
              const disabled = item.disabled ? styles.disabled : '';
              const normal =
                item.value === showValue ? `${styles.item} ${styles.selectItem}` : `${styles.item}`;
              return `${normal} ${disabled}`;
            })()}
            onClick={() => item.disabled || tabClick(item)}
          >
            <div className={styles.itemLabel}>{item.label}</div>
          </div>
        ))}
      </div>
    );
  }
  return <Radio.Group {...rest}>{children}</Radio.Group>;
};
