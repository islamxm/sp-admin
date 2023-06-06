import styles from './DocsPage.module.scss';
import {Row, Col, Checkbox} from 'antd';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Select from '../../components/Select/Select';
import { useAppSelector } from '../../hooks/reduxHook';
import { useEffect, useState } from 'react';
import ApiService from '../../service/ApiService';
import { PulseLoader } from 'react-spinners';
import DatePicker from '../../components/DatePicker/DatePicker';
import moment from 'moment';

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




const sortList = [
    {value: 'name', label: 'ФИО'},
    {value: 'employee ', label: 'Сотрудник'},
    {value: 'content ', label: 'Контент'},
]

const getStatus = (status: string) => {
    if(status === '1') {
        return "Создано"
    }
    if(status === '0') {
        return 'Отозвано'
    }
    return null
}


const DocsPage = () => {
    const {mainReducer: {token}} = useAppSelector(s => s)
    const [load, setLoad] = useState(false)

    const [folderList, setFolderList] = useState<any[]>([])
    const [empList, setEmpList] = useState<any[]>([])
    const [typesList, setTypesList] = useState<any[]>([])
    const [tempList, setTempList] = useState<any[]>([])
    

    const [list, setList] = useState<any[]>([])

    const [search, setsearch] = useState('')
    const [search_by, setsearch_by] = useState('')
    const [folder, setfolder] = useState('')
    const [employee, setemployee] = useState('')
    const [template_type, settemplate_type] = useState('')
    const [template, settemplate] = useState('')
    const [archive, setarchive] = useState('')
    const [status, setstatus] = useState('')
    const [start_date, setstart_date] = useState('')
    const [end_date, setend_date] = useState('')

    // useEffect(() => {

    // }, [l])

    

    const onUpdate = () => {
        if(token) { 
            setLoad(true)
            const body = new FormData() 
            body.append('search', search)
            body.append('search_by', search_by)
            body.append('folder', folder)
            body.append('employee', employee)
            body.append('template_type', template_type)
            body.append('template', template)
            body.append('archive', archive)
            body.append('status', status)
            body.append('start_date', start_date)
            body.append('end_date', end_date)            

            service.getDocs(body, token).then(res => {
                console.log(res?.documents)
                setList(res?.documents)

                setFolderList(res?.folders?.map((i: any) => ({value: i.id, label: i.id})))
                setEmpList(res?.employees?.map((i: any) => ({value: i.id, label: i.name})))
                setTypesList(res?.types?.map((i: any) => ({value: i.id, label: i.title})))
                setTempList(res?.templates?.map((i: any) => ({value: i.id, label: i.title})))
            }).finally(() => setLoad(false))
        }
    }

    useEffect(() => {
        onUpdate()
    }, [token])


    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e?.key === 'Enter' && e.which === 13) {
            onUpdate()
        }
    }

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
                                                value={search}
                                                onKeyDown={onEnter}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setsearch(e.target.value)}
                                                />
                                        </Col>
                                        <Col span={6}>
                                            <Select
                                                options={sortList}
                                                placeholder='По сотруднику'
                                                onChange={setsearch_by}
                                                value={search_by ? search_by : null}
                                                />
                                        </Col>
                                        <Col span={8}>
                                            <Button
                                                text='Поиск'
                                                onClick={onUpdate}
                                                load={load}
                                                isRound
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
                                                value={folder ? folder : null}
                                                options={folderList}
                                                onChange={setfolder}
                                                />
                                        </Col>
                                        <Col span={4}>
                                            <Select
                                                label='Сотрудник'
                                                placeholder="Сотрудник"
                                                value={employee ? employee : null}
                                                options={empList}
                                                onChange={setemployee}
                                                />
                                        </Col>
                                        {/* <Col span={4}>
                                            <Select
                                                label='Тип документа'
                                                placeholder='Тип документа'
                                                value={template_type ? template_type : null}
                                                options={typesList}
                                                />
                                        </Col> */}
                                        <Col span={4}>
                                            <Select
                                                label='Шаблон документа'
                                                placeholder="Шаблон документа"
                                                value={template ? template : null}
                                                options={tempList}
                                                onChange={settemplate}
                                                />
                                        </Col>
                                        <Col span={4}>
                                            {/* <Select
                                                label='Дата от'
                                                placeholder="Дата от"
                                                /> */}
                                            <DatePicker
                                                placeholder='Выбрать дату'
                                                fieldLabel='Дата от'
                                                onChange={e => setstart_date(moment(e?.toDate()).format('YYYY-MM-DD'))}
                                                />
                                        </Col>
                                        <Col span={4}>
                                            <DatePicker
                                                fieldLabel='Выбрать дату'
                                                placeholder='Дата до'
                                                onChange={e => setend_date(moment(e?.toDate()).format('YYYY-MM-DD'))}
                                                />
                                        </Col>
                                        <Col span={4}>
                                            <span style={{marginRight: 10}}>Отозван</span>
                                            <Checkbox
                                                id='status'
                                                checked={status === '1'}
                                                onChange={(e) => e.target.checked ? setstatus('1') : setstatus('0')}
                                                />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        <div className={styles.action}>
                            <div className={styles.action_item}>
                                <Button
                                    text='Сформировать отчет'
                                    isRound
                                    />
                            </div>
                            
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.main}>
                        {
                            load ? <div className={styles.load}><PulseLoader color='#383F56'/></div> : (
                                <table className='table'>
                                    <tr className='table__row table__row-head'>
                                        {
                                            tableHead?.map((item,index) => (
                                                <th className='table__item table__item-head'>{item.label}</th>
                                            ))
                                        }
                                    </tr>
                                    {
                                        list?.map((i,index) => (
                                            <tr className='table__row'>
                                                <td className="table__item">{i.id}</td>
                                                <td className="table__item">{i.folder}</td>
                                                <td className="table__item">{i.title}</td>
                                                <td className="table__item">{i.type}</td>
                                                <td className="table__item">{i.employee}</td>
                                                <td className="table__item">{i.archive}</td>
                                                <td className="table__item">{getStatus(i.status)}</td>
                                                <td className="table__item">{i.date}</td>
                                                <td className="table__item">{'-'}</td>
                                            </tr>
                                        ))
                                    }
                                </table>
                            )
                        }
                        
                    </div>
                </Col>
            </Row>
        </div>
    )

}

export default DocsPage;