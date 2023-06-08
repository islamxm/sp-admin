import styles from './TerminalsPage.module.scss';
import List from '../../components/List/List';
import {useState, useEffect} from 'react';
import { useAppSelector } from '../../hooks/reduxHook';
import ApiService from '../../service/ApiService';
import Card from '../tempPage/components/Card/Card';
import ModalTerminal from '../../modals/modalTerminal/ModalTerminal';
const service = new ApiService()


const TerminalsPage = () => {
    const {token} = useAppSelector(s => s.mainReducer)
    const [load, setLoad] = useState(false)
    const [list, setList] = useState<any[]>([])
    const [modal, setModal] = useState(false)
    const [selected, setSelected] = useState<any>(null)

    const getTerminals = () => {
        if(token) {
            setLoad(true)
            service.getDataTypes(token).then(res => {
                setList(res?.terminals)
            }).finally(() => {
                setLoad(false)
            })
        }
    }


    useEffect(() => {
        getTerminals()
    }, [token])

    useEffect(() => {
        if(selected) {
            setModal(true)
        }
    }, [selected])

    return (
        <div className={styles.wrapper}>
            <ModalTerminal
                onUpdate={getTerminals}
                data={selected}
                open={modal}
                onCancel={() => {
                    setModal(false)
                    setSelected(null)
                }}
                />
            <List>
                {
                    load ? (
                        null
                    ) : (
                        <>
                            {
                                list?.map((i,index) => (
                                    <Card
                                        label={i.name}
                                        onSelect={setSelected}
                                        data={i}
                                        />
                                ))
                            }
                        </>
                    )
                }
            </List>
        </div>
    )
}

export default TerminalsPage;