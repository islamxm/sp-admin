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

    elementType: 1 | 2 
}


const ModalType:FC<I> = (props) => {
    const {
        data, 
        onCancel, 
        onUpdate, 
        elementType
    } = props

    const {mainReducer: {token}} = useAppSelector(s => s)
    const [load, setLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)

    const [title, setTitle] = useState('')
    // const [picture, setPicture] = useState<Blob | null>(null)
    // const [preview, setPreview] = useState('')


    // useEffect(() => {
    //     if(picture) {
    //         setPreview(URL.createObjectURL(picture))
    //     } else setPreview('')
    // }, [picture])
    

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
                    // if(picture) {
                    //     body.append('thumbnail_picture', picture)
                    // }
                    // if(!preview && !picture) {
                    //     body.append('thumbnail_picture', '')
                    // }
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
                setLoad(false)
                alert('NO_FUNC_GN')
            }
            
        }
    }


    const onDelete = () => {
        if(data && token) {
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