import styles from './Item.module.scss';
import { Row, Col } from 'antd';
import IconButton from '../../../../components/IconButton/IconButton';
import {IoCloseCircleOutline} from 'react-icons/io5';
import {useEffect} from 'react';


const Item = ({data, onDelete, onSelect}: {data: any, onDelete?: (...args: any[]) => any, onSelect?: (...args: any[]) => any}) => {
    const {
        name,
        role,
        id
    } = data || {}

    return (
        <div className={styles.wrapper}>
            <div className={styles.action}>
                <IconButton
                    onClick={() => onDelete && onDelete(id)}
                    variant='danger'
                    icon={<IoCloseCircleOutline size={20}/>}
                    />
            </div>
            <div className={styles.body} onClick={() => {
                onSelect && onSelect(data)
            }}>
            <Row gutter={[2,2]}>
                <Col span={24}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.ex}>{role}</div>
                </Col>
            </Row>
            </div>
            
        </div>
    )
}


export default Item;