import styles from './ModalConfirm.module.scss';
import {Modal, ModalFuncProps, Row, Col} from 'antd';
import {FC} from 'react';
import Button from '../../components/Button/Button';
interface I {
    head?: string,
    onConfirm?: (...args:any[]) => any,
    load?: boolean
}

const ModalConfirm:FC<I & ModalFuncProps> = (props) => {
    const {onCancel, load, onConfirm, head} = props

    const onClose = () => {
        onCancel && onCancel()
    }

    return (
        <Modal
            {...props}
            onCancel={onClose}
            footer={false}
            className={`${styles.wrapper} modal`}
            >
            <Row gutter={[30,30]}>
                <Col span={24}>
                    <div className={styles.head}>{head}</div>
                </Col>
                <Col span={24}>
                    <div className={styles.action}>
                        <Row gutter={[15,15]}>
                            <Col span={12}>
                                <Button
                                    fill
                                    text='Да'
                                    load={load}
                                    onClick={() => onConfirm && onConfirm()}
                                    />
                            </Col>
                            <Col span={12}>
                                <Button
                                    fill
                                    variant={'danger'}
                                    onClick={onClose}
                                    text='Нет'
                                    />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Modal>
    )
}

export default ModalConfirm;


