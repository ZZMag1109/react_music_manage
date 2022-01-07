// 应用的根组件


import React from 'react'
import './App.less'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';

const App = () => (
    <div className="App">
        <HashRouter>
            <Routes>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/admin" element={<Admin/>}></Route>
                <Route path="/" element={<Navigate to="/login"/>}></Route>
            </Routes>
        </HashRouter>
    </div>
        

    
  );
  
  export default App;
