import { IIconButton } from "./types";
import { FC } from "react";
import styles from './IconButton.module.scss';



const IconButton:FC<IIconButton> = (props) => {
    const {icon, iconSize = 20, style, variant = 'default'} = props

    const switchVariant = () => {
        switch(variant) {
            case 'black':
                return styles.black
            case 'danger':
                return styles.danger
            case 'default':
                return styles.default
        }
    }

    return (
        <button 
            {...props}
            style={{...style, width: iconSize, height: iconSize}}
            type="button"
            className={`${styles.wrapper} ${switchVariant()}`}>
            {icon}
        </button>
    )
}

export default IconButton;
