import styles from './ArchPage.module.scss';
import {Row, Col} from 'antd';
import Card from '../tempPage/components/Card/Card';
import {useState, useEffect} from 'react';
import { useAppSelector } from '../../hooks/reduxHook';
import ApiService from '../../service/ApiService';

const service = new ApiService()
const mock = ['Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку']

const ArchPage = () => {
    const {mainReducer: {token}} = useAppSelector(s => s)
    const [list, setList] = useState<any[]>([])
    
    const getArchs = () => {
        if(token) {
            service.getArchs(token).then(res => {
                setList(res?.archives)
            })
        }
    }

    useEffect(() => {
        getArchs()
    }, [token])
    
    return (
        <div className={styles.wrapper}>
            <Row gutter={[12,12]}>
                {
                    list?.map((item) => (
                        <Col span={4} key={item.id}><Card label={item.title}/></Col>
                    ))
                }       
            </Row> 
        </div>
    )
}

export default ArchPage;