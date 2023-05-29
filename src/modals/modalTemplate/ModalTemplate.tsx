import styles from './ModalTemplate.module.scss';
import { ModalFuncProps, Modal, Row, Col } from 'antd';
import { FC } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import Item from './components/Item/Item';

interface I extends ModalFuncProps {

}


const ModalTemplate:FC<I> = (props) => {


    return (
        <Modal
            {...props}
            className={`modal modal-ll ${styles.wrapper}`}
            width={435}
            footer={false}
            
            >
            <div className='modal-title'>Добавить шаблон</div>
            <div className={styles.body}>
            <Row gutter={[15,15]}>
                <Col span={24}>
                    <Input
                        fill
                        placeholder='Название шаблона'
                        />
                </Col>
                <Col span={24}>
                    <Select
                        label='Архив'
                        placeholder="Выбрать архив"
                        />
                </Col>
                <Col span={24}>
                    {/* upload */}
                </Col>
                <Col span={24}>
                    <div className={styles.part}>
                        <div className={styles.head}>Поля для ввода:</div>
                        <Row gutter={[8,8]}>
                            <Col span={24}>
                                <Row gutter={[12,12]}>
                                    <Col span={4}>Name -</Col>
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
                            <Col span={24}>
                                <Row gutter={[12,12]}>
                                    <Col span={4}>Age -</Col>
                                    <Col span={14}>
                                        <Input
                                            fill
                                            placeholder='Название'
                                            />
                                    </Col>
                                    <Col span={6}>
                                        <Select
                                            placeholder="Число"
                                            />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[12,12]}>
                                    <Col span={4}>Date -</Col>
                                    <Col span={14}>
                                        <Input
                                            fill
                                            placeholder='Название'
                                            />
                                    </Col>
                                    <Col span={6}>
                                        <Select
                                            placeholder="Дата"
                                            />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Col>
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
                        <Button text='Сохранить' fill/>
                    </Col>
                    <Col span={12}>
                        <Button text='Удалить' fill variant={'danger'}/>
                    </Col>
                </Row>
            </div>
            </div>
           
        </Modal>
    )

}


export default ModalTemplate;