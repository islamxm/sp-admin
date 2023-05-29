import { ModalFuncProps, Modal, Row, Col } from 'antd';
import { FC } from 'react';
import Button from '../../components/Button/Button';

import Select from '../../components/Select/Select';


interface I extends ModalFuncProps {

}


const ModalEmp:FC<I> = (props) => {

    return (
        <Modal
            {...props}
            className={`modal`}
            footer={false}
            >
            <div className='modal-title'>Добавить новый тип</div>
            <Row gutter={[25,25]}>
                <Col span={24}>
                    <Select
                        placeholder='Выбор'
                        />
                </Col>
                <Col span={24}>
                    <Row gutter={[12,12]}>
                        <Col span={12}><Button text='Сохранить' fill/></Col>
                        <Col span={12}><Button text='Удалить' variant={'danger'} fill/></Col>
                    </Row>
                </Col>
            </Row>
        </Modal>
    )

}

export default ModalEmp