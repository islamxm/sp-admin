import styles from './Button.module.scss';
import { IButton } from './types';
import { FC } from 'react';

const Button:FC<IButton> = (props) => {
    const {text, variant = 'blue', isRound} = props

    const switchVariant = () => {
        switch(variant) {
            case 'blue':
                return styles.blue
            case 'danger':
                return styles.danger
        }
    }

    return (
        <button
            {...props}
            type='button'
            className={`${styles.wrapper} ${isRound ? styles.round : ''} ${switchVariant()}`}
            >
            {text}
        </button>
    )
}

export default Button;