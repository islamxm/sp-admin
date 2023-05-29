import styles from './Input.module.scss';
import { IInput } from './types';
import { FC } from 'react';

const Input:FC<IInput> = (props) => {
    const {label, fill} = props

    return (
        <div className={`${styles.wrapper} ${fill ? styles.fill : ''}`}>
            {
                label && <div className={styles.label}>{label}</div>
            }
            <input
                {...props}
                type='text'
                className={styles.input}
                />
        </div>
    )
}

export default Input;