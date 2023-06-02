import styles from './StationsPage.module.scss';
import {Row, Col} from 'antd';
import {useState, useEffect} from 'react'
import Card from '../tempPage/components/Card/Card';
import { PulseLoader } from 'react-spinners';
import { useAppSelector } from '../../hooks/reduxHook';
import ApiService from '../../service/ApiService';
import ModalStation from '../../modals/modalStation/ModalStation';
const service = new ApiService()

const StationsPage = () => {
    const {token} = useAppSelector(s => s.mainReducer)
    const [modal, setModal] = useState(false)
    const [load, setLoad] = useState(false)
    const [selected, setSelected] = useState<any>(null)
    const [list, setList] = useState<any[]>([])

    const onUpdate = () => {
        if(token) {
            setLoad(true)
            service.getStations(token).then(res => {
                setList(res?.stations)
            }).finally(() => {
                setLoad(false)
            })
        }
    }

    useEffect(() => {
        onUpdate()
    }, [token])
    
    useEffect(() => {
        if(selected) {
            setModal(true)
        }
    }, [selected])



    return (
        <div className={styles.wrapper}>
            <ModalStation
                onUpdate={onUpdate}
                data={selected}
                open={modal}
                onCancel={() => {
                    setModal(false)
                    setSelected(null)
                }}
                />

            <Row gutter={[12,12]}>
                {   
                    load ? (
                        <div className={styles.load}><PulseLoader color={"#383F56"}/></div>
                    ) : (
                        <>
                            {
                                list?.map((item) => (
                                    <Col span={4} key={item.id}>
                                        <Card 
                                            data={item}
                                            onSelect={setSelected}
                                            label={item.title}/>
                                    </Col>
                                ))
                            }
                        </> 
                    )
                }   
            </Row> 
        </div>
    )
}

export default StationsPage;