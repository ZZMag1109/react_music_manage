import React, { useEffect } from 'react'
import './style.less'
import { Layout, Button } from 'antd'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Home from '../home/home';
const { Header, Footer, Sider, Content } = Layout;

export default React.memo(Admin);
function Admin() {
    const navigate = useNavigate();

    useEffect(() => {
        //读取保存的user信息，如果不存在，直接跳转到登录界面
       const user = JSON.parse(localStorage.getItem("user_key") || "{}");
       if (!user.id) {
        navigate('/login', { replace: true });
       }
    },[])

    return (
        <Layout className='app-layout'>
            <Header>Header</Header>
            <Layout>
                <Sider>Sider</Sider>
                <Content>
                    <Routes>
                        <Route path="home" element={<Home />}></Route>
                        <Route path="/" element={<Navigate to="home"/>}></Route>
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    )
}
