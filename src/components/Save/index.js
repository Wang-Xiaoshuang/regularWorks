import React from 'react';
import checked from '@/assets/checked.svg'
import { router } from 'umi';
import { Steps, Button } from 'antd';
import styles from './index.less'

const { Step } = Steps;

export default props => {
    const { url } = props

    return (
        <div className={styles.content}>
            <Steps current={3}>
                <Step title="文件上传" />
                <Step title="匹配核对" />
                <Step title="上传提交" />
            </Steps>
            <img src={checked} alt="" />
            <div>提交成功</div>
            <Button type="primary" size="large" onClick={() => router.push(url)}>
                <div className={styles.btn}>完成</div>
            </Button>
        </div>
    )
}
