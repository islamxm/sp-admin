import styles from './TempPage.module.scss';
import { Row, Col } from 'antd';
import Card from '../../components/Card/Card';
import ModalType from '../../modals/modalType/ModalType';
import ModalArchive from '../../modals/modalArchive/ModalArchive';
import ModalTemplate from '../../modals/modalTemplate/ModalTemplate';
import ModalRevokeDoc from '../../modals/modalRevokeDoc/ModalRevokeDoc';
import ModalEmp from '../../modals/modalEmp/ModalEmp';
import { useAppSelector } from '../../hooks/reduxHook';
import ApiService from '../../service/ApiService';
import { useEffect } from 'react';

const service = new ApiService()

const mock = ['Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку']

const TempPage = () => {
    const {mainReducer: {token}} = useAppSelector(s => s)


    useEffect(() => {
        if(token) {
            const body = new FormData()
            body.append('category_id', '0')
            body.append('parent_id', '0')
            service.getTemps(body).then(res => {
                console.log(res)
            })
        }
    }, [token])


    

    return (
        <div className={styles.wrapper}>

            <ModalTemplate/>
            
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