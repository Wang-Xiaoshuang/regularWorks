import React from 'react';
import styles from './index.less'

export default props => {
    const { table, style } = props

    return (<div className={styles.table} style={style}>
        {table.map(i => (
            <div key={i.label}>
                <div>{i.label}</div>
                <div>{i.value}</div>
            </div>
        ))}
    </div>)
}