import styles from './ModalType.module.scss';
import { ModalFuncProps, Modal, Row, Col } from 'antd';
import { ChangeEvent, FC, useState } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useAppSelector } from '../../hooks/reduxHook';
import ApiService from '../../service/ApiService';
import UploadFile from '../../components/UploadFile/UploadFile';
import {useEffect} from 'react'
const service = new ApiService()




interface I extends ModalFuncProps {
    data?: any,
    onUpdate?: (...args: any[]) => any,
    pathList?: string[]
    elementType: 1 | 2 
}


const ModalType:FC<I> = (props) => {
    const {
        data, 
        onCancel, 
        onUpdate, 
        elementType,
        pathList
    } = props

    const {mainReducer: {token}} = useAppSelector(s => s)
    const [load, setLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)

    const [title, setTitle] = useState('')

    

    useEffect(() => {
        if(data) {
            setTitle(data?.title)
        } else {
            setTitle('')
        }
    }, [data])

    

    const onSave = () => {
        if(token) {
            setLoad(true)
            if(elementType === 1) {
                if(data) {
                    const body = new FormData()
                    body.append('title', title)
                    body.append('category_id', data?.id)
                    service.editCat(body,token).then(res => {
                        if(res?.error === false) {
                            onUpdate && onUpdate()
                            onClose()
                        }
                    }).finally(() => {
                        setLoad(false)
                    })
                } else {
                    const body = new FormData()
                    body.append('title', title)
                    service.addCat(body,token).then(res => {
                 
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
            if(elementType === 2) {
                if(pathList) {
                    if(data) {
                        const body = new FormData()
                            body.append('title', title)
                            body.append('sub_category_id', data?.id)
                            service.editSubcat(body,token).then(res => {
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
                        if(pathList?.length === 1) {
                            const body = new FormData()
                            body.append('title', title)
                            body.append('category_id', pathList[0])
                            body.append('parent_id', '0')
                            service.addSubcat(body,token).then(res => {
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
                        if(pathList?.length > 1) {
                            const body = new FormData()
                            body.append('title', title)
                            body.append('category_id', pathList[0])
                            body.append('parent_id', pathList[pathList?.length - 1])
                            service.addSubcat(body,token).then(res => {
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
                
            }
            
        }
    }


    const onDelete = () => {
        if(data && token) {
            if(elementType === 1) {
                setDelLoad(true)
                const body = new FormData()
                body.append('category_id', data?.id)
                service.deleteCat(body, token).then(res => {
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
            if(elementType === 2) {
                setDelLoad(true)
                const body = new FormData()
                body.append('sub_category_id', data?.id)
                service.deleteSubcat(body, token).then(res => {
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
    }





    // const onPictureChange = (e:ChangeEvent<HTMLInputElement>) => {
    //     if(typeof e.target.files?.length !== 'undefined' && e.target.files?.length > 0) {
    //         setPicture(e.target.files[0])
    //     }
    // }



    const onClose = () => {
        // setPicture(null)
        // setPreview('')
        setTitle('')
        onCancel && onCancel()
    }


    return (
        <Modal
            {...props}
            className={`modal`}
            footer={false}
            onCancel={onClose}
            >
            <div className='modal-title'>
                {
                    data ? 'Редактировать тип' : 'Добавить новый тип'
                }
            </div>
            <Row gutter={[25,25]}>
                <Col span={24}>
                    <Input
                        placeholder='Заголовок'
                        fill
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        value={title}
                        />
                </Col>
                {/* <Col span={24}>
                    <UploadFile
                        id='upload-type-pic'
                        onChange={onPictureChange}
                        deleteFile={() => {
                            setPicture(null)
                            setPreview('')
                        }}
                        accept='.png, .jpg, .jpeg'
                        value={''}
                        preview={preview}
                        />
                </Col> */}
                <Col span={24}>
                    {
                        data ? (
                            <Row gutter={[12,12]}>
                                <Col span={12}><Button onClick={onSave} disabled={!title} load={load} text='Сохранить' fill/></Col>
                                <Col span={12}><Button onClick={onDelete} load={delLoad} disabled={!data} text='Удалить' variant={'danger'} fill/></Col>
                            </Row>
                        ) : <Button onClick={onSave} disabled={!title} load={load} text='Сохранить' fill/>
                    }
                </Col>
            </Row>
        </Modal>
    )

}

export default ModalType