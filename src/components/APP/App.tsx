import {FC} from 'react';
import Layout from '../Layout/Layout';
import { Routes, Route, useLocation } from "react-router-dom";


import DocsPage from '../../pages/docsPage/DocsPage';


const App:FC = () => {
    const location = useLocation()


    return (
        <div>
            <Layout>
                <Routes location={location} key={location.pathname}>
                    <Route path='/' element={<DocsPage/>}/>
                    <Route path='/documents' element={<DocsPage/>}/>
                </Routes>
            </Layout>
        </div>
    )
}

export default App;