import React from 'react';
import Nav from '@/components/Nav'
import Save from '@/components/Save'
import styles from './save.less'


const nav = [
    {
        name: '送检数据录入 /',
        link: '/manage/list',
    }, {
        name: '批量文件上传',
    },
]

export default () => {
    return (<>
        <Nav data={nav} />
        <div className="duplicate_page">
            <div className="duplicate_titleWrapper">
                <span className="title">批量文件上传</span>
            </div>
            <div className={styles.content}>
                <Save url="/manage/list" />
            </div>
        </div>
    </>)
}
