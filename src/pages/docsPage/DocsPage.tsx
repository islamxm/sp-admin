import styles from './DocsPage.module.scss';
import {Row, Col} from 'antd';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Select from '../../components/Select/Select';
import { useAppSelector } from '../../hooks/reduxHook';
import { useEffect } from 'react';
import ApiService from '../../service/ApiService';

const service = new ApiService()

const tableHead = [
    {
        label: 'ID',
    },
    {
        label: 'Папка'
    },
    {
        label: 'Документ'
    },
    {
        label: 'Тип документа'
    },
    {
        label: 'Сотрудник'
    },
    {
        label: 'Место размещения'
    },
    {
        label: 'Архив'
    },
    {
        label: 'Статус'
    },
    {
        label: 'Дата'
    },
    {
        label: 'Действие'
    }
]


const mockData = [
    ['100', '10', 'Согласие на обработку персональных данных', 'Согласие', 'Александров Виктор Денисович', 'Гостиничный комплекс “Богатырь”', 'Стойка регистрации', 'Не отозван', '12.03.2023 16:50', 'action'],
    ['100', '10', 'Согласие на обработку персональных данных', 'Согласие', 'Александров Виктор Денисович', 'Гостиничный комплекс “Богатырь”', 'Стойка регистрации', 'Не отозван', '12.03.2023 16:50', 'action'],
    ['100', '10', 'Согласие на обработку персональных данных', 'Согласие', 'Александров Виктор Денисович', 'Гостиничный комплекс “Богатырь”', 'Стойка регистрации', 'Не отозван', '12.03.2023 16:50', 'action']
]


const DocsPage = () => {
    const {mainReducer: {token}} = useAppSelector(s => s)

    useEffect(() => {
        if(token) {
            
        }
    }, [token])

    return (
        <div className={styles.wrapper}>
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <div className={styles.top}>
                        <div className={styles.body}>
                            <Row gutter={[12,12]}>
                                <Col span={24}>
                                    <Row gutter={[12,12]}>
                                        <Col span={10}>
                                            <Input
                                                placeholder='Поиск...'
                                                fill
                                                />
                                        </Col>
                                        <Col span={6}>
                                            <Select
                                                placeholder='По сотруднику'
                                                />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={24}>
                                    <Row gutter={[12,12]}>
                                        <Col span={4}>
                                            <Select
                                                label='Номер папки'
                                                placeholder="Номер папки"
                                                />
                                        </Col>
                                        <Col span={4}>
                                            <Select
                                                label='Сотрудник'
                                                placeholder="Сотрудник"
                                                />
                                        </Col>
                                        <Col span={4}>
                                            <Select
                                                label='Тип документа'
                                                placeholder='Тип документа'
                                                />
                                        </Col>
                                        <Col span={4}>
                                            <Select
                                                label='Шаблон документа'
                                                placeholder="Шаблон документа"
                                                />
                                        </Col>
                                        <Col span={4}>
                                            <Select
                                                label='Место размещения'
                                                placeholder="Место размещения"
                                                />
                                        </Col>
                                        <Col span={4}>
                                            <Select
                                                label='Структурное подразделение'
                                                placeholder="Структурное подразделение"
                                                />
                                        </Col>
                                        <Col span={4}>
                                            <Select
                                                label='Дата от'
                                                placeholder="Дата от"
                                                />
                                        </Col>
                                        <Col span={4}>
                                            <Select
                                                label='Дата до'
                                                placeholder="Дата до"
                                                />
                                        </Col>
                                        <Col span={4}>
                                            <Select
                                                label='Статус (отозван/не отозван)'
                                                placeholder="Статус (отозван/не отозван)"
                                                />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        <div className={styles.action}>
                            <Button
                                text='Сформировать отчет'
                                isRound
                                />
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.main}>
                        <table className='table'>
                            <tr className='table__row table__row-head'>
                                {
                                    tableHead?.map((item,index) => (
                                        <th className='table__item table__item-head'>{item.label}</th>
                                    ))
                                }
                            </tr>
                            {
                                mockData?.map((item,index) => (
                                    <tr className='table__row'>
                                        {
                                            item?.map((i, ind) => (
                                                <td className="table__item">{i}</td>
                                            )) 
                                        }
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                </Col>
            </Row>
        </div>
    )

}

export default DocsPage;