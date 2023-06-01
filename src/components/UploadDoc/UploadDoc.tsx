import styles from './UploadDoc.module.scss';
import { IUploadDoc } from './types';
import {FC} from 'react';
import {TbDownload} from 'react-icons/tb'


const UploadDoc:FC<IUploadDoc> = (props) => {
    const {preview} = props

    return (
        <div className={styles.wrapper}>
            <input {...props} type='file' accept='.doc, .docx'/>
            <label className={styles.label} htmlFor={props.id}>
                <div className={styles.title}>
                    {
                        preview ? preview : 'Выберите документ (docx)'
                    }
                </div>
                <div className={styles.icon}>
                    <TbDownload/>
                </div>
            </label>
        </div>
    )
}

export default UploadDoc;