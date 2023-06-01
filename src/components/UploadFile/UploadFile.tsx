import styles from './UploadFile.module.scss';
import {FC} from 'react'
import { IUploadFile } from './types';
import IconButton from '../IconButton/IconButton';
import {IoMdCloseCircle} from 'react-icons/io';

const UploadFile:FC<IUploadFile> = (props) => {
    const {preview, deleteFile} = props

    return (
        <div className={styles.wrapper}>
            <div className={styles.in}>
                <div className={styles.title}>Файл</div>
                {
                    preview ? (
                        <div className={styles.preview}>
                            <div className={styles.action}>
                                <IconButton
                                    onClick={() => deleteFile && deleteFile()} 
                                    variant={'danger'} 
                                    icon={<IoMdCloseCircle 
                                    size={20}/>}/>
                            </div>
                            <img src={preview} alt="" />
                        </div>
                    ) : (
                        <div className={styles.placeholder}>
                            <input {...props} type="file" />
                            <label className={styles.label} htmlFor={props.id}>
                                
                            </label>
                        </div>
                        
                    )
                }
            </div>
        </div>
    )
}

export default UploadFile;