
import { FC } from "react";
import styles from './IconLink.module.scss';
import { IIconLink } from "./types";


const IconLink:FC<IIconLink> = (props) => {
    const {variant, icon, iconSize, style} = props

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
        <a
            {...props}
            style={{...style, width: iconSize, height: iconSize}}
            className={`${styles.wrapper} ${switchVariant()}`}>
            {icon}
        </a>
    )
}

export default IconLink;
