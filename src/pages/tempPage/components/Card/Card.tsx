import styles from './Card.module.scss';
import { FC, useEffect } from 'react';
import { ICard } from './types';
import { Row, Col } from 'antd';
import IconButton from '../../../../components/IconButton/IconButton';
import {MdEditDocument} from 'react-icons/md';
import LinesEllipsis from 'react-lines-ellipsis'


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
            {/* {
                data?.is_sub_category === '0' ? (
                    null
                ) : (
                    <div onClick={() => onSelect && onSelect(data)} className={styles.action}>
                        <MdEditDocument color='#fff' size={20}/>
                    </div>
                )
            } */}
            <div 
                
                className={styles.in}>
                {
                    data?.is_sub_category === '0' ? null : (
                        <div onClick={() => onSelect && onSelect(data)} className={styles.edit}>
                            <MdEditDocument/>
                        </div>
                    )
                }
                <div 
                    onClick={() => {
                        
                        if(data?.is_sub_category === undefined || data?.is_sub_category === '1') {
                            onRoute && onRoute(id)
                        }
                        if(data?.is_sub_category === '0') {
                            onSelect && onSelect(data)
                        }
                    }}
                    className={styles.label}>
                    <div className={styles.text}>
                        <LinesEllipsis maxLine={2} text={label}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Card;