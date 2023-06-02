import styles from './PrintersPage.module.scss';
import {Row, Col} from 'antd';
import ModalPrinter from '../../modals/modalPrinter/ModalPrinter';
import {useState, useEffect} from 'react'
import Card from '../tempPage/components/Card/Card';
import { PulseLoader } from 'react-spinners';
import { useAppSelector } from '../../hooks/reduxHook';
import ApiService from '../../service/ApiService';
const service = new ApiService()

const PrintersPage = () => {
    const {token} = useAppSelector(s => s.mainReducer)
    const [modal, setModal] = useState(false)
    const [load, setLoad] = useState(false)
    const [selected, setSelected] = useState<any>(null)
    const [list, setList] = useState<any[]>([])

    const onUpdate = () => {
        if(token) {
            setLoad(true)
            service.getPrinters(token).then(res => {
                setList(res?.printers)
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
            <ModalPrinter
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
                                            label={item.name}/>
                                    </Col>
                                ))
                            }
                            {/* add */}
                            <Col span={4}>
                                <Card 
                                    isAdd 
                                    isCat
                                    placeholder='Новый принтер'
                                    onAddCat={() => setModal(true)}
                                    />
                            </Col>  
                        </> 
                    )
                }   
            </Row> 
        </div>
    )
}

export default PrintersPage;