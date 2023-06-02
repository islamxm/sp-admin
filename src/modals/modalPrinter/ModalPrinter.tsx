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
}


const ModalPrinter:FC<I> = (props) => {
    const {
        data, 
        onCancel, 
        onUpdate, 

    } = props

    const {mainReducer: {token}} = useAppSelector(s => s)
    const [load, setLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)

    const [name, setName] = useState('')

    const onClose = () => {
        setName('')
        onCancel && onCancel()
    }

    useEffect(() => {
        if(data) {
            setName(data?.name)
        } else {
            setName('')
        }
    }, [data])

    



    const onSave = () => {
        if(token) {
            if(data) {
                setLoad(true)
                const body = new FormData()
                body.append('name', name)
                body.append('printer_id', data?.id)
                service.editPrinter(body, token).then(res => {
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
                setLoad(true)
                const body = new FormData()
                body.append('name', name)
                service.addPrinter(body, token).then(res => {
                    if(res?.error === false) {
                        onUpdate && onUpdate()
                        onClose()
                    } else {
                        alert('Произошла ошибка')
                    }
                }).finally(() => setLoad(false))
            }
        }
    }

    const onDelete = () => {
        if(data && token) {
            setDelLoad(true)
            const body = new FormData()
            body.append('printer_id', data?.id)
            service.deletePrinter(body, token).then(res => {
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



    return (
        <Modal
            {...props}
            className={`modal`}
            footer={false}
            onCancel={onClose}
            >
            <div className='modal-title'>
                {
                    data ? 'Редактировать принтер' : 'Добавить новый принтер'
                }
            </div>
            <Row gutter={[25,25]}>
                <Col span={24}>
                    <Input
                        placeholder='Заголовок'
                        fill
                        value={name}
                        onChange={(e:ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        />
                </Col>
                <Col span={24}>
                    {
                        data ? (
                            <Row gutter={[12,12]}>
                                <Col span={12}><Button onClick={onSave} load={load} text='Сохранить' fill/></Col>
                                <Col span={12}><Button onClick={onDelete} load={delLoad} disabled={!data} text='Удалить' variant={'danger'} fill/></Col>
                            </Row>
                        ) : <Button onClick={onSave} load={load} text='Сохранить' fill/>
                    }
                </Col>
            </Row>
        </Modal>
    )

}

export default ModalPrinter;