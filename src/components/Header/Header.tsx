import { useEffect } from 'react';
import styles from './Header.module.scss';
import TempAction from './compoents/TempAction/TempAction';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation()


    return (
        <div className={styles.wrapper}>
            
            <div className={styles.main}>
                {/* {location?.pathname?.includes('/templates') && <TempAction/>} */}
            </div>
            {
                location?.pathname !== 'auth' && <div className={styles.action}></div>
            }
            
        </div>
    )
}

export default Header;