/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @realTypescript-eslint/camelcase */
/* eslint-disable react/no-array-index-key */
import { List, Tag, Avatar } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';
// 可点击的array 分割线
export function renderA(list = [], type = 'expert') {
  return list.map((v, i) => {
    const prefix = i !== 0 ? '；' : '';
    if (v.id) {
      return (
        <>
          {prefix}
          <a href={`/detail?id=${v.id}&database=${type}`} target="_blank" rel="noopener noreferrer">
            {v.name}
          </a>
        </>
      );
    }
    return `${prefix}${v.name}`;
  });
}
const colors = [
  'cyan',
  'blue',
  'geekblue',
  'purple',
  'magenta',
  'red',
  'volcano',
  'orange',
  'green',
  'gold',
];

export function Tags({ data = [], des }) {
  return (
    <div className="lz-tags-line">
      {des && `${des}：`}
      {data.map((v, idx) => (
        <Tag key={idx} color={colors[idx % colors.length]}>
          {v?.name ? v.name : v}
        </Tag>
      ))}
    </div>
  );
}

function renderSub(t, item) {
  switch (t) {
    case 'company':
      return (
        <>
          {(item?.labels || []).map((v, idx) => (
            <Tag className="lz-tag" color="blue" key={idx}>
              {v}
            </Tag>
          ))}
          <div>
            <div className={styles.desLabel}>法人：{item?.legal_person}</div>
            <div className={styles.desLabel}>注册资金：{item?.regist_capi}</div>
            <div className={styles.desLabel}>成立日期：{item?.establish_date}</div>
          </div>
          <div>注册地址：{item?.address}</div>
          <div className={styles.extra}>
            <Tags data={item?.chain_node} des="所在领域" />
          </div>
        </>
      );
    case 'expert':
      return (
        <>
          {(item?.labels || []).map((v, idx) => (
            <Tag className="lz-tag" color="blue" key={idx}>
              {v}
            </Tag>
          ))}
          <div>
            <div className={styles.desLabel}>任职单位：{item?.org}</div>
            <div className={styles.desLabel}>职称：{item?.prof_title}</div>
          </div>
          <div className="lz-line1">简介：{item?.desc}</div>
          <div className={styles.extra}>
            <Tags data={item?.chain_node} des="研究领域" />
          </div>
        </>
      );
    case 'organization':
      return (
        <>
          <Tags data={item?.chain_node} />
          <div>
            <div className={styles.desLabel}>地址：{item?.address}</div>
          </div>
          <div className={`${styles.desc} lz-line2`}>简介：{item?.desc}</div>
        </>
      );
    case 'patent':
      return (
        <>
          <Tags data={item?.chain_node} />
          <div>
            <div className={styles.desLabel}>专利类型：{item?.patent_type}</div>
            <div className={styles.desLabel}>公布号：{item?.public_code}</div>
            <div className={styles.desLabel}>公布日期：{item?.public_date}</div>
          </div>
          <div className={`${styles.desc} lz-line2`}>摘要：{item?.abstract}</div>
        </>
      );
    case 'article':
      return (
        <>
          <Tags data={item?.chain_node} />
          <div>
            <div className={styles.desLabel}>学科类别：{(item?.subject || []).join('；')}</div>
            <div className={styles.desLabel}>作者：{(item?.inventors || []).join('；')}</div>
            <div className={styles.desLabel}>发表日期：{item?.year}</div>
          </div>
          <div className={`${styles.desc} lz-line2`}>摘要：{item?.abstract}</div>
        </>
      );
    case 'news':
      return (
        <>
          <Tags data={item?.chain_node} />
          <div>
            <div className={styles.desLabel}>来源：{item?.source}</div>
            <div className={styles.desLabel}>发布日期：{item?.publish_time}</div>
          </div>
        </>
      );
    case 'policy':
      return (
        <>
          <Tags data={item?.chain_node} />
          <div>
            <div className={styles.desLabel}>发布单位：{item?.publisher}</div>
            <div className={styles.desLabel}>发布时间：{item?.publish_time}</div>
          </div>
          <div className={`${styles.desc} lz-line2`}>摘要：{item?.content}</div>
        </>
      );
    case 'report':
      return (
        <>
          <Tags data={item?.chain_node} />
          <div>
            <div className={styles.desLabel}>发布机构：{item?.publisher}</div>
            <div className={styles.desLabel}>发布时间：{item?.publish_time}</div>
          </div>
        </>
      );
    case 'project':
      return (
        <>
          <Tags data={item?.chain_node} />
          <div>
            <div className={styles.desLabel}>项目起始时间：{item?.start_time}</div>
            <div className={styles.desLabel}>承担机构：{item?.organization?.join?.('、')}</div>
            <div className={styles.desLabel}>
              项目金额：{item?.funding}
              {item?.funding_unit}
            </div>
          </div>
          <div className={`${styles.desc} lz-line2`}>项目摘要：{item?.desc}</div>
        </>
      );
    case 'financing':
      return (
        <>
          <div>
            <div className={styles.desLabel}>融资轮次：{item?.financing_round}</div>
            <div className={styles.desLabel}>融资金额：{item?.financing_amount}</div>
            <div className={styles.desLabel}>融资时间：{item?.financing_time}</div>
          </div>
          <div>投资方：{item?.investors?.map?.(v => v.name)?.join?.('、')}</div>
          <div className={styles.extra}>
            <Tags data={item?.chain_node} des="所在领域" />
          </div>
        </>
      );
    default:
      return '';
  }
}

function Card({ item, onClick, type = 'company', throttle = false, devOp }) {
  const [asyncType, setType] = useState(type);
  // 防止页面切换闪屏
  // eslint-disable-next-line no-redeclare
  let realType = type;
  if (throttle) {
    // eslint-disable-next-line no-param-reassign
    realType = asyncType;
  }
  useEffect(() => {
    if (!devOp) {
      setType(type);
    }
  }, [devOp]);
  let avatar = false;
  if (realType === 'company' || realType === 'expert') {
    avatar = <Avatar src={item.logo || '/userDefault.jpg'} />;
  }
  let name =
    realType === 'company' ||
    realType === 'expert' ||
    realType === 'organization' ||
    realType === 'project' ||
    realType === 'financing'
      ? item.name
      : item.title;
  if (realType === 'financing') {
    name = item.financing_company?.name;
  }
  return (
    <List.Item className={`${styles.item} ${realType}`}>
      <List.Item.Meta
        avatar={avatar}
        title={
          <div>
            <a
              onClick={e => onClick(e, item)}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: name }}
            ></a>
          </div>
        }
        description={<div className={styles.content}>{renderSub(realType, item)}</div>}
      />
    </List.Item>
  );
}

export default Card;
