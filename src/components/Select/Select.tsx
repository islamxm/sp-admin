import styles from './Select.module.scss';
import {Select as AntSelect} from 'antd';
import { FC, useEffect, useState } from 'react';
import { ISelect } from './types';

const Select = (props:ISelect) => {
    const {label} = props

    const [searchVal, setSearchVal] = useState('')


    return (    
        <div className={styles.wrapper}>
            {
                label && <div className={styles.label}>{label}</div>
            }
            <div className={styles.select}>
                <AntSelect 
                    {...props} 
                    searchValue={searchVal} 
                    showSearch 
                    onSearch={setSearchVal}
                    filterOption={(input,option) => 
                        typeof option?.label === 'string' && (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                />
            </div>
        </div>
    )
}

export default Select;