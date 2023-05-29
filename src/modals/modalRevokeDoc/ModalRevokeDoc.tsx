import { ModalFuncProps, Modal, Row, Col } from 'antd';
import { FC } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

interface I extends ModalFuncProps {

}




const ModalRevokeDoc:FC<I> = (props) => {

    return (
        <Modal
            {...props}
            className={`modal`}
            width={435}
            footer={false}
            >
            <Row gutter={[50,50]}>
                <Col span={24}>
                    <div style={{fontSize: 20, lineHeight: '29px', fontWeight: 600, textAlign: 'center'}}>
                    Вы уверены, что хотите отозвать документ?
                    </div>
                </Col>
                <Col span={24}>
                    <Row gutter={[10,10]}>
                        <Col span={12}>
                            <Button isRound fill text='Подтвердить отзыв'/>
                        </Col>
                        <Col span={12}>
                            <Button isRound fill text='Отменить действие' variant='danger'/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Modal>
    )

}

export default ModalRevokeDoc;