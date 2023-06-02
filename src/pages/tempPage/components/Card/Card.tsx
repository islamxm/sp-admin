import styles from './Card.module.scss';
import { FC, useEffect } from 'react';
import { ICard } from './types';
import { Row, Col } from 'antd';
import IconButton from '../../../../components/IconButton/IconButton';
import {MdEditDocument} from 'react-icons/md';



const Card:FC<ICard> = ({
    label,
    isAdd,
    isCat,
    id,
    data,

    placeholder='Добавить новый тип',
    
    onRoute,
    onSelect,

    onAddCat,
    onAddTemplate
}) => {

    


    if(isAdd) {
        return (
            <div className={styles.add}>
                <Row gutter={[8,8]}>
                    {
                        isCat ? (
                            <Col span={24}>
                                <div 
                                    onClick={() => onAddCat && onAddCat()}
                                    className={styles.part}><div className={styles.label}>{placeholder}</div></div>
                            </Col>
                        ) : (
                            <>
                                <Col span={12}>
                                    <div onClick={() => onAddCat && onAddCat()} className={styles.part}><div className={styles.label}>{placeholder}</div></div>
                                </Col>
                                <Col span={12}>
                                    <div onClick={() => onAddTemplate && onAddTemplate()} className={styles.part}><div className={styles.label}>Добавить шаблон</div></div>
                                </Col>  
                            </>
                        )
                    }
                </Row>
                
                
            </div>
        )
    }
    return (
        <div  
            className={`${styles.wrapper} ${isAdd ? styles.add : ''}`}>
            <div className={styles.action}>
                <IconButton onClick={() => onSelect && onSelect(data)} icon={<MdEditDocument size={20}/>}/>
            </div>
            <div 
                onClick={() => {
                    
                    if(data?.is_sub_category === undefined || data?.is_sub_category === '1') {
                        onRoute && onRoute(id)
                    }
                }}
                className={styles.in}>
                <div className={styles.label}>
                    {label}
                </div>
            </div>
        </div>
    )
}


export default Card;