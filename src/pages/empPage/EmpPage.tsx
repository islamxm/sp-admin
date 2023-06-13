import styles from './EmpPage.module.scss';
import {Row, Col} from 'antd';
import Button from '../../components/Button/Button';
import ApiService from '../../service/ApiService';
import { useAppSelector } from '../../hooks/reduxHook';
import {useEffect, useState} from 'react'
import { PulseLoader } from 'react-spinners';
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
        label: 'Департамент'
    },
    // {
    //     label: 'Место размещения'
    // },
    // {
    //     label: 'Архив'
    // },
    // {
    //     label: 'Дата найма'
    // },
    // {
    //     label: 'Действие'
    // },
   
]

const service = new ApiService()



const EmpPage = () => {
    const {mainReducer: {token}} = useAppSelector(s => s)
    const [list, setList] = useState<any[]>([])
    const [load,setLoad] = useState(false)
    const [syncLoad, setSyncLoad] = useState(false)
    
    const getEmps = () => {
        if(token) {
            setLoad(true)
            service.getEmps(token).then(res => {
                setList(res?.employees)
            }).finally(() => setLoad(false))
        }
    }

    useEffect(() => {
        getEmps()
    }, [token])

    const onSync  = () => {
        if(token) {
            setSyncLoad(true)
            service.sync(token).then(res => {
                if(res?.error === false) {
                    alert('Синхронизация прошла успешно')
                } else {
                    alert('Произошла ошибка')
                }
            }).finally(() => setSyncLoad(false))
        }
    }

    return (
        <div className={styles.wrapper}>
            <Row gutter={[15,15]}>
                <Col span={24}>
                    <div className={styles.top}>
                        <Button onClick={onSync} load={syncLoad} isRound text='Обновить выгрузку'/>
                        <Button variant={'black_bordered'} text='Черный список' isRound/>
                    </div>
                </Col>
                <Col span={24}>
                    {
                        load ? <div className={styles.load}><PulseLoader color='#383F56'/></div> : (
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
                                        list?.map((item,index) => (
                                            <tr className='table__row'>
                                                <td className="table__item">{item.id}</td>
                                                <td className="table__item">{item.name}</td>
                                                <td className="table__item">{item.role}</td>
                                                <td className="table__item">{item.department}</td>
                                                {/* <td className="table__item">-</td>
                                                <td className="table__item">-</td>
                                                <td className="table__item">-</td>
                                                <td className="table__item">-</td> */}
                                            </tr>
                                        ))
                                    }
                                </table>
                            </div>
                        )
                    }
                </Col>
            </Row>
        </div>
    )
}


export default EmpPage;