import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import Nav from '@/components/Nav'
import checked from '@/assets/checked.svg'
import { router } from 'umi';
// import Save from '@/components/Save'
import { Steps, Button, Spin } from 'antd';
import { toSave } from './services';
import styles from './save.less'

const { Step } = Steps;


const nav = [
    {
        name: '送检数据录入 /',
        link: '/input/list',
    }, {
        name: '批量文件上传',
    },
]

export default connect(models => ({
    input: models.input,
}))(props => {
    const { dispatch } = props;
    const { batchName } = props.location.query;
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        toSave({ batchName }).then(res => {
            if (res) {
                dispatch({
                    type: 'input/init',
                    payload: { batchName },
                });
                setLoading(false)
            }
        });
    }, [])

    return (
        <>
            <Nav data={nav} />
            <div className="duplicate_page">
                <div className="duplicate_titleWrapper">
                    <span className="title">批量文件上传</span>
                </div>
                <div className={styles.contentWrapper}>
                    <div className={styles.content}>
                        <Steps current={3}>
                            <Step title="文件上传" />
                            <Step title="匹配核对" />
                            <Step title="上传提交" />
                        </Steps>
                        {loading ?
                            <div className={styles.downContent}>
                                <Spin size="large" indicator={<LoadingOutlined style={{ fontSize: 64, color: '#01b2b9' }} spin />} />
                                <div className={styles.text}>提交中...</div>
                            </div>
                            : <div className={styles.downContent}>
                                <img src={checked} alt="" />
                                <div className={styles.text}>提交成功</div>
                                <Button type="primary" size="large" onClick={() => router.push('/input/list')}>
                                    <div className={styles.btn}>完成</div>
                                </Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
});
