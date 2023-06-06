import styles from './Footer.module.scss';
import ApiService from '../../service/ApiService';
import { useAppSelector } from '../../hooks/reduxHook';
import  {useState, useEffect} from 'react'
import Input from '../Input/Input';
import Button from '../Button/Button';
const service = new ApiService()
const Footer = () => {
    const {token} = useAppSelector(s => s.mainReducer)
    const [value, setValue] = useState('')
    const [initValue, setInitValue] = useState('')
    const [load, setLoad] = useState(false)

    const setLocalValue = () => {
        if(token) {
            setLoad(true)
            const body = new FormData()
            body.append('count', value)
            service.setFolderCount(body, token).then(res => {
                setValue(res?.count)
                setInitValue(res?.count)
            }).finally(() => setLoad(false))
        }
    }

    const getValue = () => {
        if(token) {
            service.getFolderCount(token).then(res => {
                setValue(res?.count)
                setInitValue(res?.count)
            })
        }
    }

    useEffect(() => {
        getValue()
    }, [token])



    return (
        <footer className={styles.wrapper}>
            <div className={styles.arch_info}>
                <div className={styles.label}>Количество страниц в папке:</div>
                <div className={styles.value}>
                    <Input
                        style={{width: 80}}
                        value={value}
                        type='number'
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                        />
                </div>
                {
                    initValue !== value && (
                        <div className={styles.action}>
                            <Button
                                onClick={setLocalValue}
                                text='Сохранить'
                                load={load}
                                disabled={!value}
                                />
                        </div>
                    )
                }
                
            </div>
        </footer>
    )
}

export default Footer;