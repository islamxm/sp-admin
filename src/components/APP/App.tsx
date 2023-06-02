import {FC} from 'react';
import Layout from '../Layout/Layout';
import { Routes, Route, useLocation } from "react-router-dom";
import { Provider } from 'react-redux';
import store from '../../store/store';
import PrivateRoute from '../../hok/PrivateRoute';


import DocsPage from '../../pages/docsPage/DocsPage';
import TempPage from '../../pages/tempPage/TempPage';
import EmpPage from '../../pages/empPage/EmpPage';
import ArchPage from '../../pages/archPage/ArchPage';
import AuthPage from '../../pages/authPage/AuthPage';
import PrintersPage from '../../pages/printersPage/PrintersPage';
import StationsPage from '../../pages/stationsPage/StationsPage';




const App:FC = () => {
    const location = useLocation()


    return (
        <Provider store={store}>
            <div>
                <Layout>
                    <Routes location={location} key={location.pathname}>
                        <Route path='/auth' element={<AuthPage/>}/>
                        <Route path='/' element={<PrivateRoute><DocsPage/></PrivateRoute>}/>
                        <Route path='/documents' element={<PrivateRoute><DocsPage/></PrivateRoute>}/>
                        <Route path='/templates' element={<PrivateRoute><TempPage/></PrivateRoute>}/>
                        <Route path='/archive' element={<PrivateRoute><ArchPage/></PrivateRoute>}/>
                        <Route path='/employees' element={<PrivateRoute><EmpPage/></PrivateRoute>}/>
                        <Route path='/printers' element={<PrivateRoute><PrintersPage/></PrivateRoute>}/>
                        <Route path='/stations' element={<PrivateRoute><StationsPage/></PrivateRoute>}/>
                    </Routes>
                </Layout>
            </div>
        </Provider>
        
    )
}

export default App;