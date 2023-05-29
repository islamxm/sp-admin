import styles from './Item.module.scss';
import { Row, Col } from 'antd';
import IconButton from '../../../../components/IconButton/IconButton';
import {IoCloseCircleOutline} from 'react-icons/io5';

const Item = () => {


    return (
        <div className={styles.wrapper}>
            <div className={styles.action}>
                <IconButton
                    variant='danger'
                    icon={<IoCloseCircleOutline size={20}/>}
                    />
            </div>
            <div className={styles.body}>
            <Row gutter={[2,2]}>
                <Col span={24}>
                    <div className={styles.name}>Анна Петренко</div>
                    <div className={styles.ex}>Менеджер отдела продаж</div>
                </Col>
            </Row>
            </div>
            
        </div>
    )
}


export default Item;