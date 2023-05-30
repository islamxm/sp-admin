import { BeatLoader } from 'react-spinners';
import styles from './Button.module.scss';
import { IButton } from './types';
import { FC } from 'react';


const Button:FC<IButton> = (props) => {
    const {text, variant = 'blue', isRound, fill, type = 'button', load} = props

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
            className={`${styles.wrapper} ${isRound ? styles.round : ''} ${switchVariant()} ${fill ? styles.fill : ''} ${load ? styles.loading: ''}`}
            >
            {load && <div className={styles.load}><BeatLoader color='#fff'/></div>}
            <div className={styles.text}>{text}</div>
        </button>
    )
}

export default Button;