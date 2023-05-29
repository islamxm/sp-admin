import styles from './Button.module.scss';
import { IButton } from './types';
import { FC } from 'react';

const Button:FC<IButton> = (props) => {
    const {text, variant = 'blue', isRound, fill} = props

    const switchVariant = () => {
        switch(variant) {
            case 'blue':
                return styles.blue
            case 'danger':
                return styles.danger
            case 'black_bordered':
                return styles.black_bordered
        }
    }

    return (
        <button
            {...props}
            type='button'
            className={`${styles.wrapper} ${isRound ? styles.round : ''} ${switchVariant()} ${fill ? styles.fill : ''}`}
            >
            {text}
        </button>
    )
}

export default Button;