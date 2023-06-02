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


const service = new ApiService()

interface I extends ModalFuncProps {

    data?: any,
    onUpdate?: (...args: any[]) => any
}


const ModalTemplate:FC<I> = (props) => {
    const {
        data,
        onUpdate,
        onCancel
    } = props
    const {mainReducer: {token}} = useAppSelector(s => s)
    const [params, setParams] = useSearchParams()
    const [empModal, setEmpModal] = useState(false)

    const [load, setLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)


    const [archives, setArchives] = useState<any[]>([])


    const [doc, setDoc] = useState<File | null>(null) 
    const [docprev, setDocprev] = useState('')

    const [picture, setPicture] = useState<Blob | null>(null)
    const [preview, setPreview] = useState('')

    const [category_id, setcategory_id] = useState('')
    const [parent_id, setparent_id] = useState('')
    const [archive_id, setarchive_id] = useState('')
    const [title, settitle] = useState('')
    const [inputs, setinputs] = useState<{id:string, keyword: string, name: string,data_type_id:string,required: string}[]>([])
    const [employees, setemployees] = useState<{id: string, employee_id: string}[]>([])





    const onClose = () => {
        onCancel && onCancel()
    }

    useEffect(() => {
        if(token) {
            service.getArchs(token).then(res => {
                setArchives(res?.archives)
            })
        }
    }, [token])

    useEffect(() => {
        if(picture) {
            setPreview(URL.createObjectURL(picture))
        } else setPreview('')
    }, [picture])

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
                    console.log(res)
                })
            }
        }
    }, [data, token])



    const onSave = () => {
        if(token) {
            setLoad(true)
            const body = new FormData()
            body.append('data', `{
                category_id: ${getParams(params).join('/')[0]},
                parent_id: '',
                archive_id: '',
                title: '',
                inputs: [],
                employees: []
            }`)
            if(picture) {
                body.append('thumbnail_picture', picture)
            }
            if(doc) {
                body.append('document_file', doc)
            }
            service.addTemp(body,token).then(res => {
                console.log(res)
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
                        id: 0,
                        keyword: i,
                        name: '',
                        data_type_id: 0,
                        required: 0
                    }
                }))
            })
        }
    }


    return (
        <>
            <ModalEmp
                open={empModal}
                // selectEmp={}
                />
            <Modal
            {...props}
            className={`modal modal-ll ${styles.wrapper}`}
            width={435}
            footer={false}
            onCancel={onClose}
            >
            <div className='modal-title'>Добавить шаблон</div>
            <div className={styles.body}>
            <Row gutter={[15,15]}>
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
                        onChange={(e) => setarchive_id(e)}
                        options={archives?.map(i => {
                            return {
                                value: i.id,
                                label: i.title
                            }
                        })}
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
                                        inputs?.map(i => (
                                            <Col span={24}>
                                                <Row gutter={[12,12]}>
                                                    <Col span={4}>{i.keyword} -</Col>
                                                    <Col span={14}>
                                                        <Input
                                                            fill
                                                            placeholder='Название'
                                                            />
                                                    </Col>
                                                    <Col span={6}>
                                                        <Select
                                                            placeholder="Строка"
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
                        <div className={styles.head}>Доступ сотрудников:</div>
                        <Row gutter={[10,10]} justify={'center'}>
                            <Col span={20}>
                                <button className={styles.add}>
                                    Добавить
                                </button>
                            </Col>
                            <Col span={20}>
                                <Item/>
                            </Col>
                            <Col span={20}>
                                <Item/>
                            </Col>
                            <Col span={20}>
                                <Item/>
                            </Col>
                            <Col span={20}>
                                <Item/>
                            </Col>
                            <Col span={20}>
                                <Item/>
                            </Col>
                            <Col span={20}>
                                <Item/>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <div className={styles.action}>
                <Row gutter={[12,12]}>
                    <Col span={12}>
                        <Button
                            load={load} 
                            onClick={onSave}
                            text='Сохранить' 
                            fill/>
                    </Col>
                    <Col span={12}>
                        <Button text='Удалить' fill variant={'danger'}/>
                    </Col>
                </Row>
            </div>
            </div>
           
        </Modal>
        </>
        
    )

}


export default ModalTemplate;