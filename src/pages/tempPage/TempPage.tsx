import styles from './TempPage.module.scss';
import { Row, Col } from 'antd';
import Card from './components/Card/Card';
import ModalType from '../../modals/modalType/ModalType';
import ModalTemplate from '../../modals/modalTemplate/ModalTemplate';
import { useAppSelector } from '../../hooks/reduxHook';
import ApiService from '../../service/ApiService';
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import getParams from '../../utils/getParams';
import { PulseLoader } from 'react-spinners';
import List from '../../components/List/List';
const service = new ApiService()


const TempPage = () => {
    const {mainReducer: {token}} = useAppSelector(s => s)
    
    
    const [params, setParams] = useSearchParams()

    const [load, setLoad] = useState(false)

    const [modalCat, setModalCat] = useState(false)
    const [modalTemp, setModalTemp] = useState(false)

    const [pathList, setPathList] = useState<any[]>([])

    // const [list, setList] = useState<any[]>([])
    const [catsList, setCatsList] = useState<any[]>([])
    const [tempsList, setTempsList] = useState<any[]>([])


    const [selected, setSelected] = useState<any>(null)
    const [temp, setTemp] = useState<any>(null)


    const getCats = () => {
        if(token) {
            setLoad(true)
            service.getCats(token).then(res => {
                setCatsList(res?.categories)
            }).finally(() => {
                setLoad(false)
            })
        }
    }

    const getTemps = (category_id: string, parent_id: string) => {
        if(token) {
            setLoad(true)
            const data = new FormData()
            data.append('category_id', category_id)
            data.append('parent_id', parent_id)
            service.getTemps(data, token).then(res => {
                setTempsList(res?.templates)
                console.log(res)
            }).finally(() => {
                setLoad(false)
            })
        }
    }   



    const onUpdate = () => {
  
        if(pathList?.length >= 1) {
            if(pathList?.length === 1) {
                getTemps(pathList[0], '0')
            }
            if(pathList?.length === 2) {
                getTemps(pathList[0], pathList[1])
            }
            if(pathList?.length > 2) {
                getTemps(pathList[0], pathList[pathList.length - 1])
            }
        } 
        if(pathList?.length === 0) {
            getCats()
        }
    }

    useEffect(() => {
        if(params) {
            setPathList(getParams(params))
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

    useEffect(() => {
        if(temp) {
            setModalTemp(true)
        } else {
            setModalTemp(false)
        }
    }, [temp])

    
    

    return (
        <div className={styles.wrapper}>
            <ModalType
                data={selected}
                elementType={pathList?.length === 0 ? 1 : 2}
                open={modalCat}
                pathList={pathList}
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
            <List>
                {
                    load ? (
                        <div className={styles.load}><PulseLoader color='#383F56'/></div>
                    ) : (
                        <>
                            {
                                pathList?.length === 0 ? (
                                    catsList?.map((item,index) => (
                                        <Card 
                                            data={item}
                                            id={item.id} 
                                            onRoute={onRoute} 
                                            label={item.title}
                                            onSelect={(d) => {
                                                (item?.hasOwnProperty('is_sub_category') && item?.is_sub_category === '0') ? setTemp(d) : setSelected(d)
                                            }}
                                            />
                                    ))
                                ) : (
                                    tempsList?.map((item,index) => (
                                        <Card 
                                            data={item}
                                            id={item.id} 
                                            onRoute={onRoute} 
                                            label={item.title}
                                            onSelect={(d) => {
                                                (item?.hasOwnProperty('is_sub_category') && item?.is_sub_category === '0') ? setTemp(d) : setSelected(d)
                                            }}
                                            />
                                    ))
                                )
                                
                            }   
                            <Card 
                                isAdd 
                                isCat={getParams(params)?.length === 0}
                                onAddCat={() => setModalCat(true)}  
                                onAddTemplate={() => setModalTemp(true)}  
                                /> 
                        </>
                    )
                }
            </List>
            <Row gutter={[12,12]}>
                
                 
            </Row> 
        </div>
    )
}

export default TempPage;