import React, { useEffect } from 'react'
import './style.less'
import { Layout, Button } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import LeftNav from '../../components/left-nav';
import MyHeader from '../../components/header';
import storageUtils from '../../utils/storageUtils';
const { Header, Footer, Sider, Content } = Layout;

export default React.memo(Admin);
function Admin(props) {
    const navigate = useNavigate();

    useEffect(() => {
        //读取保存的user信息，如果不存在，直接跳转到登录界面
        const user = storageUtils.getUser();
        if (!user.id) {
            navigate('/login', { replace: true });
        }
    }, [])

    return (
        <Layout className='app-layout'>
            <Sider>
                <div className="logo" />
                <LeftNav />
            </Sider>
            <Layout>
                <Header>
                    <MyHeader {...props} />
                </Header>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}
