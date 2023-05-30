import styles from './Layout.module.scss';
import {FC, ReactNode, useEffect} from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';
const Layout:FC<{children?: ReactNode}> = ({children}) => {
    const location = useLocation()


    return (
        <div className={`${styles.wrapper} ${location?.pathname !== 'auth' ? styles.auth : ''}`}>
            <Header/>
            {location?.pathname !== '/auth' && <Sidebar/>} 
            <div className={`${styles.main}`}>
            {children}
            </div>
        </div>
    )
}

export default Layout;