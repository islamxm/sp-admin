import styles from './Card.module.scss';
import { FC } from 'react';
import { ICard } from './types';
import { Row, Col } from 'antd';

const Card:FC<ICard> = ({
    label,
    isAdd
}) => {
    if(isAdd) {
        return (
            <div className={styles.add}>
                <Row gutter={[8,8]}>
                    <Col span={12}>
                        <div className={styles.part}><div className={styles.label}>Добавить новый тип</div></div>
                    </Col>
                    <Col span={12}>
                        <div className={styles.part}><div className={styles.label}>Добавить шаблон</div></div>
                    </Col>  
                </Row>
                
                
            </div>
        )
    }
    return (
        <div className={`${styles.wrapper} ${isAdd ? styles.add : ''}`}>
            <div className={styles.label}>{label}</div>
        </div>
    )
}


export default Card;