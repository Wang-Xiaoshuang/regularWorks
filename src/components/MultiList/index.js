/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
// 支持多行逻辑 写的有点乱
import { Empty, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';

// function isArray(arg) {
//   return Object.prototype.toString.call(arg) === '[object Array]';
// }

// tech_name: "硅基纵向功率器件的制备技术"
// tech_status: "潜在风险"
// chain_node: []

// const configData = [
//   {
//     name: '需求标题',
//     key: 'tech_name',
//     className: 'lz-col4',
//   },
//   {
//     name: '提出时间',
//     key: 'tech_status',
//     className: 'lz-col1',
//   },
//   {
//     name: '创新链节点',
//     key: 'chain_node',
//     isMulti: true,
//     inlineKey: 'node_name'
//     className: 'lz-col1',
//   },
//   {
//     name: '创新链节点',
//     key: 'chain_node',
//     className: 'lz-col1',
//     render: (data)=>(data * 100).toFixed(1) + '%'
//   },
// ];
// data-pdftable 按照table的逻辑来绘制pdf
// data-pdfempty data-pdfth  data-pdftr data-pdftd
// chain_node is array;
// 简单的多行逻辑
export default ({ listData = [], configData = [], pageSize = 5 }) => {
  const [pagi, setPagi] = useState({
    current: 1,
    total: 0,
  });
  useEffect(() => {
    setPagi({
      current: 1,
      total: listData?.length || 0,
    });
  }, [listData]);

  function onPageChange(page) {
    setPagi({
      ...pagi,
      current: page,
    });
  }

  function renderFn() {
    // [[{<>,rowSpan:2},{}],['_',{}]]
    // [[td,td,td],[td,td]]
    const { current } = pagi;
    const renderBody = [];
    const list = listData.slice((current - 1) * pageSize, current * pageSize);
    const { key: mulkey } = configData.find(v => v.isMulti) || {};
    list.forEach((v, i) => {
      let rowSpan = 0;
      if (mulkey && v[mulkey].length > 1) {
        rowSpan = v[mulkey].length;
      }
      const row = [];
      const resParams = {
        originIdx: (current - 1) * pageSize + i + 1,
        item: v,
      };
      configData.forEach(config => {
        const { className, style } = config;
        const newC = { className: `${className} lz-col-td`, style, key: config.key };
        if (!mulkey) {
          row.push(
            <td data-pdftd {...newC}>
              {config.render ? config.render(v[config.key], resParams) : v[config.key]}
            </td>,
          );
        } else if (!config.isMulti) {
          if (rowSpan) newC.rowSpan = rowSpan;
          row.push(
            <td data-pdftd {...newC}>
              {config.render ? config.render(v[config.key], resParams) : v[config.key]}
            </td>,
          );
        } else {
          const itemfirst = v[mulkey][0]; // chain
          newC.className = `${newC.className} lz-col-multdc`;
          row.push(
            <td data-pdftd {...newC}>
              {config.render
                ? config.render(itemfirst, resParams)
                : config.inlineKey
                ? itemfirst[config.inlineKey]
                : itemfirst}
            </td>,
          );
        }
      });
      renderBody.push(
        <tr className={`${styles.item} ${i % 2 ? 'even' : 'odd'}`} key={i} data-pdftr>
          {row}
        </tr>,
      );
      // 多行
      if (rowSpan) {
        const [, ...rest] = v[mulkey];
        rest.forEach((chain, chi) => {
          const otherRow = [];
          configData.forEach(config => {
            // 用来给pdfmake当空位置的
            if (!config.isMulti) {
              otherRow.push(<td style={{ display: 'none' }}>1</td>);
            } else {
              const { className, style } = config;
              const newC = {
                className: `${className} lz-col-td lz-col-multdc`,
                style,
                key: config.key,
              };
              otherRow.push(
                <td data-pdftd {...newC}>
                  {config.render
                    ? config.render(chain, resParams)
                    : config.inlineKey
                    ? chain[config.inlineKey]
                    : chain}
                </td>,
              );
            }
          });
          renderBody.push(
            <tr
              className={`${styles.item} ${i % 2 ? 'even' : 'odd'}`}
              key={`${i}_${chi}`}
              data-pdftr
            >
              {otherRow}
            </tr>,
          );
        });
      }
    });
    return renderBody;
  }
  return (
    <>
      <table className={styles.tableWrap} data-pdftable>
        <colgroup data-pdf="hidden">
          {configData.map((v, idx) => (
            <col {...v} key={idx.toString()} data-pdfcol={v.className}></col>
          ))}
        </colgroup>
        <thead>
          <tr className={styles.listItem} data-pdfth>
            {configData.map((v, idx) => (
              <th {...v} key={`${v.key}_${idx}`} data-pdftd className={`${v.className} lz-col-td`}>
                {v.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderFn()}
          {/* {listData.map((v, i) => (
          <tr className={styles.item} key={i} data-pdftr>
            {configData.map(config => {
              const { className, style } = config;
              const newC = { className: `${className} lz-col-td`, style };
              if (isArray(v[config.key]) && config.isMulti) {
                // 多行的逻辑
                const multi = v[config.key].length > 1;
                if (multi) {
                  newC.className = `${newC.className} lz-col-multd`;
                }
                return (
                  <td data-pdftd {...newC}>
                    {v[config.key].map(item => (
                      <div className={`${multi ? 'lz-col-multdc' : ''}`}>
                        {config.render
                          ? config.render(item)
                          : config.inlineKey
                          ? item[config.inlineKey]
                          : item}
                      </div>
                    ))}
                  </td>
                );
              }
              return (
                <td data-pdftd {...newC}>
                  {config.render ? config.render(v[config.key]) : v[config.key]}
                </td>
              );
            })}
          </tr>
        ))} */}
        </tbody>
      </table>
      {listData.length === 0 && (
        <div className={styles.noData} data-pdfempty>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
      {listData.length > pageSize && (
        <Pagination
          style={{ marginTop: 15, textAlign: 'right' }}
          showSizeChanger={false}
          pageSize={pageSize}
          {...pagi}
          onChange={onPageChange}
        />
      )}
    </>
  );
};
