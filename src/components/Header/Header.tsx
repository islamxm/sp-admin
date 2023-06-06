import { useEffect,useState } from 'react';
import styles from './Header.module.scss';
import TempAction from './compoents/TempAction/TempAction';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Dropdown } from 'antd';
import Menu from './compoents/Menu/Menu';
import {FiChevronDown} from 'react-icons/fi'
import ApiService from '../../service/ApiService';
import getParams from '../../utils/getParams';
import { useAppSelector } from '../../hooks/reduxHook';
import {BsArrowRight} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

const service = new ApiService()


const Header = () => {
    const nav = useNavigate()
    const {token} = useAppSelector(s => s.mainReducer)
    const location = useLocation()
    const [params, setParams] = useSearchParams()
    const [pathList, setPathList] = useState<any[]>([])

    const [bcList, setBcList] = useState<any[]>([])

    

    useEffect(() => {
        // console.log(location)
        if(location?.pathname === '/templates') {
            setPathList(getParams(params))
        } else {
            setPathList([])
        }

    }, [params, location])


    useEffect(() => {
        if(token) {
            if(pathList?.length > 0) {
                Promise.all(pathList?.map((i,index) => {
                    if(index === 0) {
                        return service.getCats(token)
                    } 
                    if(index === 1) {
                        const body = new FormData()
                        body.append('category_id', pathList[0])
                        body.append('parent_id', '0')
                        return service.getTemps(body,token)
                    }
                    if(index === 2) {
                        const body = new FormData()
                        body.append('category_id', pathList[0])
                        body.append('parent_id', pathList[1])
                        return service.getTemps(body,token)
                    }   
                    if(index > 2) {
                        const body = new FormData()
                        body.append('category_id', pathList[0])
                        body.append('parent_id', pathList[index - 1])
                        return service.getTemps(body,token)
                    }
                })).then(res => {
                    console.log(res)
                    const m = res?.map((r, index) => {
                        if(index === 0) {
                            return {
                                id: r?.categories.find((f: any) => f.id === pathList[0])?.id,
                                title: r?.categories.find((f: any) => f.id === pathList[0])?.title
                            }
                        } else {
                            return {
                                id: r?.templates?.find((f: any) => f.id === pathList[index])?.id ?? '11',
                                title: r?.templates?.find((f: any) => f.id === pathList[index])?.title ?? 'rrr',
                            }
                        }
                    })
                    console.log(m)
                    setBcList(m)
                })
            } else {
                setBcList([])
            }
        }
    }, [pathList,token])


    const goToTemp = (id: string, index: number) => {
        const nl = pathList
        const rm = nl?.splice(index + 1, pathList?.length - 1)
        console.log(nl)

        nav(`/templates?path=${nl?.join('/')}`)
    }


    return (
        <div className={styles.wrapper}>
            
            <div className={styles.main}>
                {/* {location?.pathname?.includes('/templates') && <TempAction/>} */}
                {
                    bcList?.map((i,index) => {
                        return (
                            <div 
                                onClick={() => goToTemp(i.id, index)}
                                className={styles.item}>{i?.title} <span><BsArrowRight/></span></div>
                        )
                    })
                }
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