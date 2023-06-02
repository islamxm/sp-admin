import { DatePicker as AntDatePicker, DatePickerProps } from "antd";
import styles from './DatePicker.module.scss';
import {FC} from 'react'


type dpType = {
    fieldLabel?: string
}

const DatePicker:FC<DatePickerProps & dpType> = (props) => {
    const {fieldLabel} = props
    return (
        <div className={styles.wrapper}>
            {
                fieldLabel && <div className={styles.label}>{fieldLabel}</div>
            }
            <div className={styles.body}>
                <AntDatePicker {...props}/>
            </div>
        </div>
    )
}

export default DatePicker;