import { useEffect } from 'react';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
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
    {
        label: 'Отчеты',
        url: '/reports'
    },
    {
        label: 'Сотрудники',
        url: '/employees'
    }
]


const Sidebar = () => {
    const {pathname} = useLocation()

    useEffect(() => console.log(pathname), [pathname])

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
            </div>
        </div>
    )
}

export default Sidebar;