import styles from './TempPage.module.scss';
import { Row, Col } from 'antd';
import Card from '../../components/Card/Card';

const mock = ['Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку']

const TempPage = () => {

    return (
        <div className={styles.wrapper}>
            <Row gutter={[12,12]}>
                {
                    mock?.map((item,index) => (
                        <Col span={4}><Card label={item}/></Col>
                    ))
                }   
                <Col span={4}><Card isAdd/></Col>    
            </Row> 
        </div>
    )
}

export default TempPage;