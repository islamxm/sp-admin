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
import IconButton from '../../components/IconButton/IconButton';
import {IoCloseCircleOutline} from 'react-icons/io5';
import {HiOutlinePrinter} from 'react-icons/hi';
import {RiArrowGoBackFill} from 'react-icons/ri';
import {FiDownload, FiChevronDown} from 'react-icons/fi'
import printJS from 'print-js';
import IconLink from '../../components/IconLink/IconLink';
import ModalConfirm from '../../modals/modalConfirm/ModalConfirm';
import {Pagination} from 'antd'


const service = new ApiService()

const tableHead = [
    {
        label: 'ID',
        value: 'id'
    },
    {
        label: 'Архив',
        value: 'archive'
    },
    {
        label: 'Папка',
        value: 'folder'
    },
    {
        label: 'Номер в папке',
        value: 'id_in_folder'
    },
    {
        label: 'Документ',
        value: 'title'
    },
    {
        label: 'Сотрудник',
        value: 'employee'
    },
    {
        label: 'Субъект', //фИО ГОСТЯ
        value: 'name'
    },
    {
        label: 'Дата',
        value: 'date'
    },
    {
        label: 'Статус',
        value: 'status'
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

const statusList = [
    {
        label: 'Все',
        value: 'All',
    },
    {
        label: 'Отозван',
        value: '2'
    },
    {
        label: 'Не отозван',
        value: '1'
    }

]




const DocsPage = () => {
    const {mainReducer: {token}} = useAppSelector(s => s)
    const [load, setLoad] = useState(false)
    const [reportMailLoad, setReportMailLoad] = useState(false)
    const [reportPrintLoad, setReportPrintLoad] = useState(false)

    const [modal, setModal] = useState(false)
    const [modalLoad, setModalLoad] = useState(false)

    const [email, setEmail] = useState('')

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
    const [status, setstatus] = useState(statusList[0].value)
    const [start_date, setstart_date] = useState('')
    const [end_date, setend_date] = useState('')

    const [selectedDoc, setSelectedDoc] = useState<{docId: string, statusId: string}>({docId: '', statusId: ''})

    const [offset, setoffset] = useState(0)
    const [limit, setlimit] = useState(20)
    const [order, setorder] = useState<'ASC' | 'DESC'>('DESC')
    const [order_by, setorder_by] = useState('id')
    const [total, settotal] = useState(0)

    const [isReport, setIsReport] = useState(false)

    // useEffect(() => {

    // }, [l])

    const getStatus = (status: string) => {
        if(status === '1') {
            return "Создано"
        }
        if(status === '2') {
            return 'Отозвано'
        }
        return null
    }

    const onUpdate = () => {
        if(token) { 
            setLoad(true)
            const body = new FormData() 
            body.append('search', search)
            body.append('search_by', search_by)
            body.append('folder', folder !== 'all' ? folder : '')
            body.append('employee', employee !== 'all' ? employee : '')
            body.append('template_type', template_type)
            body.append('template', template !== 'all' ? template : '')
            body.append('archive', archive)
            body.append('status', status === 'All' ? '' : status)
            body.append('start_date', start_date)
            body.append('end_date', end_date)   
            body.append('order', order)
            body.append('order_by', order_by)
            body.append('limit', limit.toString())
            body.append('offset', offset.toString())         

            service.getDocs(body, token).then(res => {
                setList(res?.documents)
                settotal(res?.total_count)
                setFolderList(
                    [
                        {value: 'all', label: 'Все'},
                        ...res?.folders?.map((i: any) => ({value: i.id, label: i.id})),
                    ]
                )
                setEmpList(
                    [
                        {value: 'all', label: 'Все'},
                        ...res?.employees?.map((i: any) => ({value: i.id, label: i.name}))
                    ]
                )
                setTypesList(res?.types?.map((i: any) => ({value: i.id, label: i.title})))
                setTempList(
                    [
                        {value: 'all', label: 'Все'},
                        ...res?.templates?.map((i: any) => ({value: i.id, label: i.title}))
                    ]
                )
            }).finally(() => setLoad(false))
        }
    }

    useEffect(() => {
        onUpdate()
    }, [token, order, offset, limit, order_by])


    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e?.key === 'Enter' && e.which === 13) {
            onUpdate()
        }
    }

    const onDocStatusChange = (document_id: string, status_id: string) => {
        

        if(status_id === '2') {
            setModal(true)
            setSelectedDoc({docId: document_id, statusId: status_id})
        } else {
            const body = new FormData()
            body.append('document_id', document_id)
            body.append('status_id', status_id)
            if(token) {
                service.changeDocStatus(body,token).then(res => {
                    if(res?.error === false) {
                        setList(s => {
                            const m = s;
                            const index = m.findIndex(i => i.id == document_id)
                            const obj = m.find(i => i.id == document_id)

                            const rm = m.splice(index, 1, {...obj, status: '1'})
                            return [...m]
                        })
                    }
                    
                })
            }
        }
        
        
    }

    const onStatus2 = () => {
        if(token) {
            setModalLoad(true)
            const body = new FormData()
            body.append('document_id', selectedDoc?.docId)
            body.append('status_id', selectedDoc?.statusId)
            service.changeDocStatus(body,token).then(res => {
                if(res?.error === false) {
                    if(selectedDoc?.docId && selectedDoc?.statusId) {
                        setList(s => {
                            const m = s;
                            const index = m.findIndex(i => i.id == selectedDoc?.docId)
                            const obj = m.find(i => i.id == selectedDoc?.docId)
    
                            const rm = m.splice(index, 1, {...obj, status: '2'})
                            return [...m]
                        })
                    }
                    
                }
            }).finally(() => {
                setModal(false)
                setModalLoad(false)
            })
        }
    }

    const onOrder = (value?: string) => {
        value && setorder_by(value)
        if(value === order_by) {
            setorder(s => {
                if(s === 'ASC') {
                    return 'DESC'
                } else {
                    return 'ASC'
                }
            })
        } else {
            setorder('DESC')
        }
        
    }

    const onPrint = () => {
        if(token) {
            const body = new FormData() 
            body.append('search', search)
            body.append('search_by', search_by)
            body.append('folder', folder !== 'all' ? folder : '')
            body.append('employee', employee !== 'all' ? employee : '')
            body.append('template_type', template_type)
            body.append('template', template !== 'all' ? template : '')
            body.append('archive', archive)
            body.append('status', status === 'all' ? '' : status)
            body.append('start_date', start_date)
            body.append('end_date', end_date)   
            body.append('order', order)
            body.append('order_by', order_by)

            setReportPrintLoad(true)
            service.reportPrint(body, token).then(res => {
                if(res?.file_url) {
                    printJS(res?.file_url, 'html')
                } else {
                    alert('Произошла ошибка')
                }
            }).finally(() => {
                setReportPrintLoad(false)
            })
        }
    }

    const onSendToEmail = () => {
        if(token) {
            const body = new FormData() 
            body.append('search', search)
            body.append('search_by', search_by)
            body.append('folder', folder !== 'all' ? folder : '')
            body.append('employee', employee !== 'all' ? employee : '')
            body.append('template_type', template_type)
            body.append('template', template !== 'all' ? template : '')
            body.append('archive', archive)
            body.append('status', status === 'all' ? '' : status)
            body.append('start_date', start_date)
            body.append('end_date', end_date)   
            body.append('order', order)
            body.append('order_by', order_by)
            body.append('email', email)
            setReportMailLoad(true)
            service.reportSendMail(body,token).then(res => {
                if(res?.error === false) {
                    alert(`Отчет отправлен на вашу почту: ${email}`)
                } else {
                    alert('Произошла ошибка')
                }
            }).finally(() => {
                setReportMailLoad(false)
            })
        }
    }

    return (
        <div className={styles.wrapper}>
            <ModalConfirm
                open={modal}
                onCancel={() => setModal(false)}
                onConfirm={onStatus2}
                load={modalLoad}
                head='Вы уверены что хотитет отозвать документ?'
                />
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
                                    <Row align={'bottom'} gutter={[12,12]}>
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
                                            <DatePicker
                                                placeholder='Выбрать дату'
                                                fieldLabel='Дата от'
                                                style={{width: '100%'}}
                                                onChange={e => {
                                                    if(e) {
                                                        setstart_date(moment(e?.toDate()).format('YYYY-MM-DD'))
                                                    } else {
                                                        setstart_date('')
                                                    }
                                                    
                                                }}
                                                />
                                        </Col>
                                        <Col span={4}>
                                            <DatePicker
                                                style={{width: '100%'}}
                                                fieldLabel='Дата до'
                                                placeholder='Выбрать дату'
                                                allowClear
                                                onChange={e => {
                                                    if(e) {
                                                        setend_date(moment(e?.toDate()).format('YYYY-MM-DD'))
                                                    } else {
                                                        setend_date('')
                                                    }
                                                }}
                                                />
                                        </Col>
                                        <Col span={4}>
                                            {/* <span style={{marginRight: 10}}>Отозван</span>
                                            <Checkbox
                                                style={{marginBottom: 8}}
                                                id='status'
                                                checked={status === '1'}
                                                onChange={(e) => e.target.checked ? setstatus('1') : setstatus('0')}
                                                /> */}
                                                <Select
                                                    label='Статус'
                                                    placeholder='Статус'
                                                    options={statusList}
                                                    value={status}
                                                    onChange={setstatus}
                                                    />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        <div className={styles.action}>
                            {
                                isReport ? (
                                    <div className={styles.action_main}>
                                        <div className={styles.action_main_btn}>
                                            <Button
                                                disabled={!email}
                                                onClick={onSendToEmail}
                                                load={reportMailLoad}
                                                isRound
                                                text='Отправить на Email'
                                                style={{borderTopRightRadius: 11, borderBottomRightRadius: 11}}
                                                />
                                        </div>
                                        <div className={styles.action_main_inp}>
                                            <Input
                                                value={email}
                                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                                placeholder='Email'
                                                type='email'
                                                // style={{widthL}}
                                                fill
                                                />
                                        </div>
                                        <div className={styles.action_main_btn}>
                                            <Button
                                                isRound
                                                onClick={onPrint}
                                                load={reportPrintLoad}
                                                text='Распечатать'
                                                style={{borderTopLeftRadius: 11, borderBottomLeftRadius: 11}}
                                                />
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.action_item}>
                                        <Button
                                            onClick={() => setIsReport(true)}
                                            text='Сформировать отчет'
                                            isRound
                                            />
                                    </div>
                                )
                            }
                            
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
                                                <th className='table__item table__item-head'>
                                                    <div 
                                                        onClick={() => {
                                                            item?.value && onOrder(item.value)
                                                        }}
                                                        className={`table__item-head_label ${order_by === item?.value ? 'active' : ''} ${order === 'ASC' ? 'asc' : 'desc'}`}>
                                                        {item.label}
                                                        <div className="table__item-head_label_icon">
                                                            <FiChevronDown/>
                                                        </div>
                                                    </div>
                                                </th>
                                            ))
                                        }
                                    </tr>
                                    {
                                        list?.map((i,index) => (
                                            <tr className='table__row'>
                                                <td className="table__item">{i.id}</td>
                                                <td className="table__item">{i.archive}</td>
                                                <td className="table__item">{i.folder}</td>
                                                <td className="table__item">{i.id_in_folder}</td>
                                                <td className="table__item">{i.title}</td>
                                                <td className="table__item">{i.employee}</td>
                                                <td className="table__item">{i?.name ? i?.name : '-'}</td>
                                                <td className="table__item">{i.date}</td>
                                                <td className="table__item">{getStatus(i.status)}</td>
                                                <td className="table__item">
                                                    <div className={styles.table_action}>
                                                        <div className={styles.table_action_item}>
                                                            <IconButton 
                                                                size={20}
                                                                onClick={() => {
                                                                    if(i?.status === '2') {
                                                                        onDocStatusChange(i.id, '1')
                                                                    } 
                                                                    if(i?.status === '1') {
                                                                        onDocStatusChange(i.id, '2')
                                                                    }
                                                                }}
                                                                variant={i?.status === '2' ? 'default' : 'danger'} 
                                                                icon={i?.status === '2' ? <RiArrowGoBackFill size={20}/> : <IoCloseCircleOutline size={20}/>}/>
                                                        </div>
                                                        <div className={styles.table_action_item}>
                                                            <IconButton
                                                                size={20}
                                                                onClick={() => printJS(i?.document_url)}
                                                                variant={'black'}
                                                                icon={<HiOutlinePrinter size={20}/>}
                                                                />
                                                        </div>
                                                        {
                                                            i?.document_url && (
                                                                <div className={styles.table_action_item}>
                                                                    <IconLink
                                                                        size={20}
                                                                        href={i?.document_url}
                                                                        download={i?.document_url}
                                                                        variant={'black'}
                                                                        icon={<FiDownload size={20}/>}
                                                                        />
                                                                </div>
                                                            )   
                                                        }
                                                        
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </table>
                            )
                        }
                        
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.pag}>
                        <Pagination
                            pageSize={limit}
                            total={total}
                            current={(offset / limit) + 1}
                            onChange={e => {
                                if(e == 1) {
                                    setoffset(0)
                                } else {
                                    setoffset((Number(e) - 1) * limit)
                                }
                            }}
                            />
                    </div>
                </Col>
            </Row>
        </div>
    )

}

export default DocsPage;