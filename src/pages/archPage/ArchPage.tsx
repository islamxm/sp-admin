import styles from './ArchPage.module.scss';
import {Row, Col} from 'antd';
import Card from '../tempPage/components/Card/Card';
import {useState, useEffect} from 'react';
import { useAppSelector } from '../../hooks/reduxHook';
import ApiService from '../../service/ApiService';
import ModalArchive from '../../modals/modalArchive/ModalArchive';
import { PulseLoader } from 'react-spinners';
import List from '../../components/List/List';

const service = new ApiService()
// const mock = ['Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку', 'Согласия на обработку']

const ArchPage = () => {
    const {mainReducer: {token}} = useAppSelector(s => s)
    const [list, setList] = useState<any[]>([])
    const [load, setLoad] = useState(false)

    const [selected, setSelected] = useState<any>(null)
    const [archModal, setArchModal] = useState(false)
 

    const onUpdate = () => {
        if(token) {
            setLoad(true)
            service.getArchs(token).then(res => {
                setList(res?.archives)
            }).finally(() => {
                setLoad(false)
            })
        }
    }

    useEffect(() => {
        onUpdate()
    }, [token])


    useEffect(() => {
        if(selected) {
            setArchModal(true)
        } else {
            setArchModal(false)
        }
    }, [selected])


    

    
    return (
        <div className={styles.wrapper}>
            <ModalArchive
                data={selected}
                onUpdate={onUpdate}
                open={archModal}
                onCancel={() => {
                    setSelected(null)
                    setArchModal(false)
                }}
                />
            <List>
                {   
                    load ? (
                        <div className={styles.load}><PulseLoader color={"#383F56"}/></div>
                    ) : (
                        <>
                            {
                                list?.map((item) => (
                                    <Card 
                                        data={item}
                                        onSelect={setSelected}
                                        label={item.title}/>
                                ))
                                
                            }
                            <Card 
                                isAdd 
                                isCat
                                placeholder='Новый архив'
                                onAddCat={() => setArchModal(true)}
                                // onAddCat={() => setModalCat(true)}  
                                // onAddTemplate={() => setModalTemp(true)}  
                                />
                        </> 
                    )
                }   
            </List> 
        </div>
    )
}

export default ArchPage;