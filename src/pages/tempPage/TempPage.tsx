import styles from './TempPage.module.scss';
import { Row, Col } from 'antd';
import Card from './components/Card/Card';
import ModalType from '../../modals/modalType/ModalType';
import ModalArchive from '../../modals/modalArchive/ModalArchive';
import ModalTemplate from '../../modals/modalTemplate/ModalTemplate';
import ModalRevokeDoc from '../../modals/modalRevokeDoc/ModalRevokeDoc';
import ModalEmp from '../../modals/modalEmp/ModalEmp';
import { useAppSelector } from '../../hooks/reduxHook';
import ApiService from '../../service/ApiService';
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import getParams from '../../utils/getParams';

const service = new ApiService()


const TempPage = () => {
    const {mainReducer: {token}} = useAppSelector(s => s)
    
    const nav = useNavigate()
    const [params, setParams] = useSearchParams()

    const [modalCat, setModalCat] = useState(false)
    const [modalTemp, setModalTemp] = useState(false)

    const [pathList, setPathList] = useState<any[]>([])

    const [list, setList] = useState<any[]>([])
    const [selected, setSelected] = useState<any>(null)
    const [temp, setTemp] = useState<any>(null)


    const getCats = () => {
        if(token) {
            service.getCats(token).then(res => {
                setList(res?.categories)
                console.log(res?.categories)
            })
        }
    }

    const getTemps = (category_id: string, parent_id: string) => {
        if(token) {
            const data = new FormData()
            data.append('category_id', category_id)
            data.append('parent_id', parent_id)
            service.getTemps(data, token).then(res => {
                setList(res?.templates)
                console.log(res?.templates)
            })

            
        }
    }   



    const onUpdate = () => {
        if(pathList?.length > 0) {
            getTemps(pathList[0], pathList[pathList.length - 1])
        } else {
            getCats()
        }
    }

    useEffect(() => {
        if(params) {
            setPathList(getParams(params))
            console.log('path')
        }
    }, [params])


    useEffect(() => {
        onUpdate()
    }, [pathList])




    const onRoute = (id: string | number) => {
        if(getParams(params)?.length > 0) {
            setParams({path: `${getParams(params)?.join('/')}/${id}`})
        } else {
            setParams({path: id.toString()})
        }
    }
    

    useEffect(() => {
        if(selected) {
            setModalCat(true)
        } else {
            setModalCat(false)
        }
    }, [selected])
    

    return (
        <div className={styles.wrapper}>
            <ModalType
                data={selected}
                elementType={pathList?.length === 0 ? 1 : 2}
                open={modalCat}
                onCancel={() => {
                    setModalCat(false)
                    setSelected(null)
                }}
                onUpdate={onUpdate}
                />
            <ModalTemplate
                data={temp}
                open={modalTemp}
                onCancel={() => {
                    setModalTemp(false)
                    setTemp(null)
                }}
                onUpdate={onUpdate}
                />
            <Row gutter={[12,12]}>
                {
                    list?.map((item,index) => (
                        <Col 
                            key={item.id} 
                            span={4}>
                            <Card 
                                data={item}
                                id={item.id} 
                                onRoute={onRoute} 
                                label={item.title}
                                onSelect={() => (item?.hasOwnPropery('is_subcategory') && item?.is_subcategory === '0') ? setTemp : setSelected}
                                />
                        </Col>
                    ))
                }   



                {/* add */}
                <Col span={4}>
                    <Card 
                        isAdd 
                        isCat={getParams(params)?.length === 0}
                        onAddCat={() => setModalCat(true)}  
                        onAddTemplate={() => setModalTemp(true)}  
                        />
                </Col>    
            </Row> 
        </div>
    )
}

export default TempPage;