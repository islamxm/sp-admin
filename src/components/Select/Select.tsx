import styles from './Select.module.scss';
import {Select as AntSelect} from 'antd';
import { FC, useEffect } from 'react';
import { ISelect } from './types';

const Select = (props:ISelect) => {
    const {label} = props



    return (    
        <div className={styles.wrapper}>
            {
                label && <div className={styles.label}>{label}</div>
            }
            <div className={styles.select}>
                <AntSelect {...props} showSearch/>
            </div>
        </div>
    )
}

export default Select;