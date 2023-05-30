import styles from './AuthPage.module.scss';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {Row, Col} from 'antd';
import { ChangeEvent, useState } from 'react';
import ApiService from '../../service/ApiService';
import {useForm} from 'react-hook-form';
import LOCAL_STORAGE from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHook';
import { main_tokenUpdate } from '../../store/slices/mainSlice';
import { useEffect } from 'react';
const service = new ApiService()

const AuthPage = () => {
    const nav = useNavigate()
    const dispatch = useAppDispatch()
    const [load, setLoad] = useState(false)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')



    useEffect(() => {
        if(LOCAL_STORAGE.getItem('sochi-park-admin-token')) {
            nav('/')
        }
    }, [])

    const onLogin = () => {
        if(login && password) {
            const body = new FormData()
            body.append('login', login)
            body.append('password', password)
            setLoad(true)
            service.login(body).then(res => {
                console.log(res)
                if(res?.token) {
                    LOCAL_STORAGE.setItem('sochi-park-admin-token', res?.token)
                    dispatch(main_tokenUpdate(res?.token))
                    nav('/', {replace: true})
                }
            }).finally(() => setLoad(false))
        }
    }

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.form}>
                <Row gutter={[15,15]}>
                    <Col span={24}>
                        <Input
                            fill
                            placeholder='Логин'
                            value={login}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
                            />
                    </Col>
                    <Col span={24}>
                        <Input
                            fill
                            placeholder='Пароль'
                            type='password'
                            value={password}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            />
                    </Col>
                    <Col span={24}>
                        <Button
                            text='Войти'
                            fill
                            disabled={!(login && password)}
                            type='submit'
                            onClick={onLogin}
                            load={load}
                            />
                    </Col>
                </Row>    
            </div>            
        </div>
    )
}


export default AuthPage;