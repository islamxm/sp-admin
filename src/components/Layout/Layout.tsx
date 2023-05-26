import styles from './Layout.module.scss';
import {FC, ReactNode} from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

const Layout:FC<{children?: ReactNode}> = ({children}) => {


    return (
        <div className={styles.wrapper}>
            <Header/>
            <Sidebar/>
            <div className={styles.main}>
            {children}
            </div>
        </div>
    )
}

export default Layout;