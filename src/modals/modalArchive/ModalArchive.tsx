import styles from './ModalArchive.module.scss';
import { ModalFuncProps, Modal, Row, Col } from 'antd';
import { FC } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

interface I extends ModalFuncProps {

}

const ModalArchive:FC<I> = (props) => {

    return (
        <Modal
            {...props}
            className={`modal`}
            footer={false}
            >
            <div className='modal-title'>Добавить новый архив</div>
            <Row gutter={[25,25]}>
                <Col span={24}>
                    <Input
                        placeholder='Название'
                        fill
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

export default ModalArchive