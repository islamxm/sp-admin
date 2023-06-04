import styles from './Menu.module.scss';
import {IoExitOutline} from 'react-icons/io5';
import { useAppDispatch } from '../../../../hooks/reduxHook';
import LOCAL_STORAGE from '../../../../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { main_tokenDelete } from '../../../../store/slices/mainSlice';


const Menu = () => {
    const nav = useNavigate()
    const dispatch = useAppDispatch()

    const onLogout = () => {    
        LOCAL_STORAGE.removeItem('sochi-park-admin-token')
        dispatch(main_tokenDelete())
        nav('/auth')
    }


    return (
        <div className={styles.wrapper}>
            <div onClick={onLogout} className={styles.item}>
                <span><IoExitOutline/> </span>Выход
            </div>
        </div>
    )
}

export default Menu;