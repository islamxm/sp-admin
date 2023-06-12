import styles from './ModalTemplate.module.scss';
import { ModalFuncProps, Modal, Row, Col } from 'antd';
import { ChangeEvent, FC } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import Item from './components/Item/Item';
import { useAppSelector } from '../../hooks/reduxHook';
import ApiService from '../../service/ApiService';
import ITemplateData from '../../models/ITemplateData';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import getParams from '../../utils/getParams';
import UploadDoc from '../../components/UploadDoc/UploadDoc';
import ModalEmp from '../modalEmp/ModalEmp';
import {Checkbox} from 'antd';


const service = new ApiService()

interface I extends ModalFuncProps {

    data?: any,
    onUpdate?: (...args: any[]) => any,
}


const ModalTemplate:FC<I> = (props) => {
    const {
        data,
        onUpdate,
        onCancel,
    } = props
    const {mainReducer: {token}} = useAppSelector(s => s)
    const [params, setParams] = useSearchParams()
    const [empModal, setEmpModal] = useState(false)

    const [load, setLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)
    const [empsList, setEmpsList] = useState<any[]>([])
    const [dataTypes, setDataTypes] = useState<{value: string, label: string}[]>([])
    const [stationsList, setStationsList] = useState<{value: string, label: string}[]>([])
    const [printersList, setPrintersList] = useState<{value: string, label: string}[]>([])
    const [selectedEmp, setSelectedEmp] = useState<any>(null)

    const [archives, setArchives] = useState<any[]>([])


    const [doc, setDoc] = useState<File | null>(null) 
    const [docprev, setDocprev] = useState('')



    const [station_id, setstation_id] = useState('')
    const [printer_id, setprinter_id] = useState('')
    const [archive_id, setarchive_id] = useState('')
    const [title, settitle] = useState('')
    const [inputs, setinputs] = useState<{id:string, keyword: string, name: string,data_type_id:string,required: string}[]>([])
    const [employees, setemployees] = useState<{id: string, terminal_id: string}[]>([])
    




    const onClose = () => {
        settitle('')
        setstation_id('')
        setprinter_id('')
        setarchive_id('')
        setinputs([])
        setemployees([])
        setDocprev('')
        onCancel && onCancel()
    }

    const getListData = () => {
        if(token) {
            service.getDataTypes(token).then(res => {
                console.log(res)
                setDataTypes(res?.data_types?.map((i: any) => ({value: i.id, label: i.name})))
                setPrintersList(res?.printers?.map((i: any) => ({value: i.id, label: i.name})))
                setStationsList(res?.stations?.map((i: any) => ({value: i.id, label: i.title})))
                setEmpsList(res?.terminals)
                setArchives(res?.archieves)

                
            })
        }
    }

    


    useEffect(() => {
        getListData()
    }, [token])


   



    useEffect(() => {
        if(doc) {
            setDocprev(doc?.name)
        } else {
            setDocprev('')
        }
    }, [doc])


    useEffect(() => { 
        if(data) {
            if(token) {
                const body = new FormData()
                body.append('template_id', data?.id)
                service.getTemp(body,token).then(res => {
                    if(res?.error === false) {
                        setarchive_id(res?.archieve_id)
                        setemployees(res?.terminals?.map((e: any) => ({id: '0', terminal_id: e.id})))
                        setinputs(res?.inputs)
                        setprinter_id(res?.printer_id)
                        setstation_id(res?.station_id)
                        settitle(res?.title)
                    }
                })
            }
        }
    }, [data, token])




    const onSave = () => {
        if(token) {
            setLoad(true)
            if(data) {
                const body = new FormData()
                body.append('data', JSON.stringify({
                    id: data?.id,
                    archive_id,
                    title,
                    inputs,
                    terminals: employees,
                    station_id,
                    printer_id
                }))
                if(doc) {
                    body.append('document_file', doc)
                }
                service.editTemp(body,token).then(res => {
                    if(res?.error === false) {
                        onUpdate && onUpdate()
                        onClose()
                    } else {
                        alert('Произошла ошибка')
                    }
                }).finally(() => {
                    setLoad(false)
                })
            } else {
                const body = new FormData()
                body.append('data', JSON.stringify({
                    category_id: getParams(params)[0],
                    parent_id: getParams(params)?.length > 2 ? getParams(params)[getParams(params).length - 2] : 0,
                    archive_id,
                    title,
                    inputs,
                    terminals: employees,
                    station_id,
                    printer_id
                }))
                if(doc) {
                    body.append('document_file', doc)
                }
                service.addTemp(body,token).then(res => {
                    if(res?.error === false) {
                        onUpdate && onUpdate()
                        onClose()
                    } else {
                        alert('Произошла ошибка')
                    }
                }).finally(() => {
                    setLoad(false)
                })
            }
            
        }   
    }

    const onDelete = () => {
        if(data && token) {
            setDelLoad(true)
            const body = new FormData()
            body.append('template_id', data?.id)

            service.deleteTemp(body,token).then(res => {
                if(res?.error === false) {
                    onUpdate && onUpdate()
                    onClose()
                } else {
                    alert('Произошла ошибка')
                }
                
            }).finally(() => {
                setDelLoad(false)
            })
        }
    }


    const onUploadDoc = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length !== undefined) {
            setDoc(e.target.files[0])
            const body = new FormData()
            body.append('document_file', e.target.files[0])
            service.getInputsFromFile(body, token).then(res => {
                setinputs(res?.keywords?.map((i: any) => {
                    return {
                        id: '0',
                        keyword: i,
                        name: '',
                        data_type_id: '1',
                        required: '0'
                    }
                }))
            })
        }
    }




    const onEmpSelect = (id: string) => {

        console.log(empsList)
        const item = empsList.find(i => i.id === id)
        
        console.log(item)
        
        const isHaveInCurrentList = employees.find(i => i.terminal_id === id)

        console.log(isHaveInCurrentList)

        if(!isHaveInCurrentList) {
            setemployees(s => [...s, {id: '0', terminal_id: id}])
        } 
    }

    const onEmpDelete = (id: string) => {
        setemployees(s => {
            const m = s;
            const rm = m.splice(m.findIndex(d => d.terminal_id === id), 1)
            return [...m]
        })
    }

    


    return (
        <>
            <ModalEmp
                open={empModal}
                onCancel={() => {
                    setEmpModal(false)
                    setSelectedEmp(null)
                }}
                onDelete={onEmpDelete}
                selectEmp={onEmpSelect}
                list={empsList?.map((i:any) => ({value: i.id, label: i.name}))}
                data={selectedEmp}
                />
            <Modal
            {...props}
            className={`modal modal-ll ${styles.wrapper}`}
            width={750}
            footer={false}
            onCancel={onClose}
            >
            <div className='modal-title'>
                {
                    data ? 'Редактировать шаблон' : 'Добавить шаблон'
                }
            </div>
            <div className={styles.body}>
            <Row align={'middle'} gutter={[15,15]}>
                <Col span={24}>
                    <Input
                        value={title}
                        onChange={(e:ChangeEvent<HTMLInputElement>) => settitle(e.target.value)}
                        fill
                        placeholder='Название шаблона'
                        />
                </Col>
                <Col span={24}>
                    <Select
                        label='Архив'
                        placeholder="Выбрать архив"
                        onChange={setarchive_id}
                        options={archives?.map(i => {
                            return {
                                value: i.id,
                                label: i.title
                            }
                        })}
                        value={archive_id ? archive_id : null}
                        />
                </Col>
                <Col span={24}>
                    <Select
                        label='Станция'
                        placeholder="Выбор станции"
                        // value={station_id}
                        onChange={setstation_id}
                        options={stationsList}
                        value={station_id ? station_id : null}
                        />
                </Col>
                <Col span={24}>
                    <Select
                        label='Принтер'
                        placeholder="Выбор принтера"
                        // value={printer_id}
                        onChange={setprinter_id}
                        options={printersList}
                        value={printer_id ? printer_id : null}
                        />
                </Col>
                <Col span={24}>
                    <UploadDoc
                        id='upload-template-doc'
                        onChange={onUploadDoc}
                        preview={docprev}
                        value={''}
                        />
                </Col>
                {
                    inputs?.length > 0 && (
                        <Col span={24}>
                            <div className={styles.part}>
                                <div className={styles.head}>Поля для ввода:</div>
                                <Row gutter={[8,8]}>
                                    {
                                        inputs?.map((i, index) => (
                                            <Col span={24}>
                                                <Row align={'middle'} gutter={[12,12]}>
                                                    <Col span={4}>{i.keyword} -</Col>
                                                    <Col span={8}>
                                                        <Input 
                                                            value={inputs[index].name}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setinputs(s => {
                                                                    const m = s;
                                                                    const rm = m.splice(index, 1, {...s[index], name: e.target.value})
                                                                    return [...m]
                                                                })
                                                            }}
                                                            fill
                                                            placeholder='Название'
                                                            />
                                                    </Col>
                                                    <Col span={6}>
                                                        <Select
                                                            value={inputs[index].data_type_id.toString() === '0' ? '' : inputs[index].data_type_id.toString()}
                                                            options={dataTypes}
                                                            onChange={e => {
                                                                setinputs(s => {
                                                                    const m = s;
                                                                    const rm = m.splice(index, 1, {...s[index], data_type_id: e})
                                                                    return [...m]
                                                                })
                                                            }}
                                                            placeholder="Строка"
                                                            />
                                                    </Col>
                                                    <Col span={6}>
                                                        <span style={{marginRight: 10}}>Объязательно</span>
                                                        <Checkbox
                                                            onChange={e => {
                                                                if(e.target.checked) {
                                                                    setinputs(s => {
                                                                        const m = s;
                                                                        const rm = m.splice(index, 1, {...s[index], required: '1'})
                                                                        return [...m]
                                                                    })
                                                                } else {
                                                                    setinputs(s => {
                                                                        const m = s;
                                                                        const rm = m.splice(index, 1, {...s[index], required: '0'})
                                                                        return [...m]
                                                                    })
                                                                }
                                                            }}
                                                            checked={inputs[index].required === '1'}
                                                            />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </div>
                        </Col>
                    )   
                }
                
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.head}>Доступные терминалы:</div>
                        <Row gutter={[10,10]} justify={'center'}>
                            <Col span={20}>
                                <button 
                                    onClick={() => setEmpModal(true)}
                                    className={styles.add}>
                                    Добавить
                                </button>
                            </Col>
                            {
                                employees?.map((i,index) => (
                                     <Col span={20}>
                                        <Item
                                            onSelect={(d) => {
                                                setSelectedEmp(d)
                                                setEmpModal(true)
                                            }}
                                            onDelete={onEmpDelete}
                                            data={empsList?.find(emp => emp.id === i.terminal_id)}
                                            />
                                    </Col>
                                ))
                            }
                        </Row>
                    </div>
                </Col>
            </Row>
            <div className={styles.action}>
                <Row gutter={[12,12]}>
                    {
                        data ? (
                            <>  
                                <Col span={12}>
                                    <Button
                                        load={load} 
                                        onClick={onSave}
                                        text='Сохранить' 
                                        fill/>
                                </Col>
                                <Col span={12}>
                                    <Button
                                        onClick={onDelete}
                                        load={delLoad} 
                                        text='Удалить' 
                                        fill 
                                        variant={'danger'}/>
                                </Col>
                            </>
                        ) : (
                            <Col span={24}>
                                <Button
                                    load={load} 
                                    onClick={onSave}
                                    text='Сохранить' 
                                    fill/>
                            </Col>
                        )
                    }
                    
                </Row>
            </div>
            </div>
           
        </Modal>
        </>
        
    )

}


export default ModalTemplate;