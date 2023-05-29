import {FC} from 'react';
import Layout from '../Layout/Layout';
import { Routes, Route, useLocation } from "react-router-dom";


import DocsPage from '../../pages/docsPage/DocsPage';
import TempPage from '../../pages/tempPage/TempPage';
import EmpPage from '../../pages/empPage/EmpPage';
import ArchPage from '../../pages/archPage/ArchPage';

const App:FC = () => {
    const location = useLocation()


    return (
        <div>
            <Layout>
                <Routes location={location} key={location.pathname}>
                    <Route path='/' element={<DocsPage/>}/>
                    <Route path='/documents' element={<DocsPage/>}/>
                    <Route path='/templates' element={<TempPage/>}/>
                    <Route path='/archive' element={<ArchPage/>}/>
                    <Route path='/employees' element={<EmpPage/>}/>
                </Routes>
            </Layout>
        </div>
    )
}

export default App;