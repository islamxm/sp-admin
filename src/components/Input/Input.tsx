import styles from './Input.module.scss';
import { IInput } from './types';
import { FC } from 'react';

const Input:FC<IInput> = (props) => {
    const {label, fill, type = 'text'} = props

    return (
        <div className={`${styles.wrapper} ${fill ? styles.fill : ''}`}>
            {
                label && <div className={styles.label}>{label}</div>
            }
            <input
                {...props}
                type={type}
                className={styles.input}
                />
        </div>
    )
}

export default Input;