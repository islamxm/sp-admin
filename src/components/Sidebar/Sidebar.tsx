import { useEffect } from 'react';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHook';
import { main_tokenDelete } from '../../store/slices/mainSlice';
import LOCAL_STORAGE from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';
const menuList = [
    {
        label: 'Документы',
        url: '/documents',
        isMain: true
    },
    {
        label: 'Шаблоны',
        url: '/templates'
    },
    {
        label: 'Архив',
        url: '/archive'
    },
    // {
    //     label: 'Отчеты',
    //     url: '/reports'
    // },
    {
        label: 'Сотрудники',
        url: '/employees'
    }
]


const Sidebar = () => {
    const nav = useNavigate()
    const {pathname} = useLocation()
    const dispatch = useAppDispatch()

    const onLogout = () => {    
        LOCAL_STORAGE.removeItem('sochi-park-admin-token')
        dispatch(main_tokenDelete())
        nav('/auth')
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.menu}>
                {
                    menuList?.map((i, index) => (
                        <Link to={i.url} className={`${styles.item} ${i.url === pathname ? styles.active : ''}`}>
                            {i.label}
                        </Link>
                    ))
                }
                <div onClick={onLogout} className={styles.item}>
                    Log out
                </div>
            </div>
        </div>
    )
}

export default Sidebar;