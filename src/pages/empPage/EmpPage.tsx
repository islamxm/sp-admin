import styles from './EmpPage.module.scss';
import {Row, Col} from 'antd';
import Button from '../../components/Button/Button';
const tableHead = [
    {
        label: 'ID',
    },
    {
        label: 'Сотрудник'
    },
    {
        label: 'Должность'
    },
    {
        label: 'Структурное подразделение'
    },
    {
        label: 'Место размещения'
    },
    {
        label: 'Архив'
    },
    {
        label: 'Дата найма'
    },
    {
        label: 'Действие'
    },
   
]


const mockData = [
    ['100', 'Александров Виктор Денисович', 'Менеджер по продажам', 'Отдел продаж', 'Гостиничный комплекс “Богатырь”', 'Стойка регистрации', '12.03.2023 16:50', 'action'],
    ['100', 'Александров Виктор Денисович', 'Менеджер по продажам', 'Отдел продаж', 'Гостиничный комплекс “Богатырь”', 'Стойка регистрации', '12.03.2023 16:50', 'action'],
    ['100', 'Александров Виктор Денисович', 'Менеджер по продажам', 'Отдел продаж', 'Гостиничный комплекс “Богатырь”', 'Стойка регистрации', '12.03.2023 16:50', 'action'],
   
]


const EmpPage = () => {

    return (
        <div className={styles.wrapper}>
            <Row gutter={[15,15]}>
                <Col span={24}>
                    <div className={styles.top}>
                        <Button isRound text='Обновить выгрузку'/>
                        <Button variant={'black_bordered'} text='Черный список' isRound/>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.body}>
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


export default EmpPage;