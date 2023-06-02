import styles from './ModalArchive.module.scss';
import { ModalFuncProps, Modal, Row, Col } from 'antd';
import { FC, useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useAppSelector } from '../../hooks/reduxHook';
import ApiService from '../../service/ApiService';


const service = new ApiService()
interface I extends ModalFuncProps {
    data?: any,
    onUpdate?: (...args: any[]) => any
}

const ModalArchive:FC<I> = (props) => {
    const {data, onUpdate, onCancel} = props
    const {token} = useAppSelector(s => s.mainReducer)
    const [title, setTitle] = useState('')

    const [load, setLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)

    const onClose = () => {
        setTitle('')
        onCancel && onCancel()
    }


    useEffect(() => {
        if(data) {
            setTitle(data?.title)
        }
    }, [data])


    const onSave = () => {
        if(token) {
            setLoad(true)
            if(data) {
                const body = new FormData()
                body.append('archive_id', data?.id)
                body.append('title', title)
                service.editArch(body, token).then(res => {
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
                body.append('title', title)
                service.addArch(body, token).then(res => {
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
        if(token && data) {
            setDelLoad(true)
            const body = new FormData()
            body.append('archive_id', data?.id)
            service.deleteArch(body, token).then(res => {
                if(res?.error === false) {
                    onUpdate && onUpdate()
                    onClose()
                } else {
                    alert('Произошла ошибка')
                }
            }).finally(() => setDelLoad(false))
        }
    }


    return (
        <Modal
            {...props}
            className={`modal`}
            footer={false}
            >
            <div className='modal-title'>
                {
                    data ? 'Редактировать архив' : 'Добавить новый архив'
                }
            </div>
            <Row gutter={[25,25]}>
                <Col span={24}>
                    <Input
                        placeholder='Название'
                        fill
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        />
                </Col>
                <Col span={24}>
                    <Row gutter={[12,12]}>
                        {
                            data ? (
                                <>
                                    <Col span={12}>
                                        <Button 
                                            load={load}
                                            onClick={onSave}
                                            disabled={!title}
                                            text='Сохранить' 
                                            fill/>
                                    </Col>
                                    <Col span={12}>
                                        <Button
                                            load={delLoad}
                                            onClick={onDelete} 
                                            text='Удалить' 
                                            variant={'danger'} 
                                            fill/>
                                    </Col>
                                </>
                            ) : (
                                <Col span={24}>
                                    <Button
                                        disabled={!title}
                                        onClick={onSave} 
                                        load={load}
                                        text='Сохранить' 
                                        fill/>
                                </Col>
                            )
                        }
                        
                    </Row>
                </Col>
            </Row>
        </Modal>
    )

}

export default ModalArchive