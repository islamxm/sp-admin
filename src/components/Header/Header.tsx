import { useEffect,useState } from 'react';
import styles from './Header.module.scss';
import TempAction from './compoents/TempAction/TempAction';
import { useLocation } from 'react-router-dom';
import { Dropdown } from 'antd';
import Menu from './compoents/Menu/Menu';
import {FiChevronDown} from 'react-icons/fi'


const Header = () => {
    const location = useLocation()


    return (
        <div className={styles.wrapper}>
            
            <div className={styles.main}>
                {/* {location?.pathname?.includes('/templates') && <TempAction/>} */}
            </div>
            {
                location?.pathname !== '/auth' && 
                <Dropdown
                    overlay={
                        <Menu/>
                    }
                    // open={open}
                    // onOpenChange={e => setOpen(e)}
                    trigger={['click']}
                    >
                    <div className={styles.action}>
                        <div className={styles.label}>Анна</div>
                        <div className={styles.icon}><FiChevronDown/></div>
                        
                        
                    </div>
                </Dropdown>
            }
            
        </div>
    )
}

export default Header;