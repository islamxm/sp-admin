import { ModalFuncProps, Modal, Row, Col } from 'antd';
import { FC, useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Select from '../../components/Select/Select';




interface I extends ModalFuncProps {
    selectEmp?:(...args: any[]) => any,
    list?: {value: string, label: string}[],
    data?: any,
    onDelete?: (...args: any[]) => any
}

const ModalEmp:FC<I> = (props) => {
    const {selectEmp, list, onCancel, data, onDelete} = props;
    const [selected, setSelected] = useState<any>(null)
   
    const onClose = () => {
        setSelected(null)
        onCancel && onCancel()
    }


    const onSave = () => {
        selectEmp && selectEmp(selected)
        onClose()
    }

    useEffect(() => {
        if(data) {
            setSelected(data.id)
        }
    }, [data])

    
    


    return (
        <Modal
            {...props}
            className={`modal`}
            footer={false}
            onCancel={onClose}
            >
            <div className='modal-title'>Выбор терминала</div>
            <Row gutter={[25,25]}>
                
                <Col span={24}>
                    <Select
                        value={selected}
                        onChange={setSelected} 
                        placeholder='Выбор'
                        options={list}
                        onFocus={() => {
                            const inputs = document?.querySelectorAll('input')
                            inputs.forEach(input => {
                                input.setAttribute('autocomplete', 'off')
                            })
                        }}
                        />
                </Col>
                <Col span={24}>
                    <Row gutter={[12,12]}>
                        {
                            data ? (
                                <>
                                    <Col span={12}>
                                        <Button
                                            disabled={!selected} 
                                            onClick={onSave}
                                            text='Сохранить' 
                                            fill/>
                                    </Col>
                                    <Col span={12}>
                                        <Button 
                                            onClick={() => {
                                                onDelete && onDelete(data?.id)
                                                onClose()
                                            }}
                                            text='Удалить' 
                                            variant={'danger'} 
                                            fill/>
                                    </Col>    
                                </>
                            ) : (
                                <Col span={24}>
                                    <Button
                                        onClick={onSave}
                                        disabled={!selected} 
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

export default ModalEmp