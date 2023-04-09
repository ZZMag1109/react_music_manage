import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import menuList from './config/menuCofig';
import * as Icon from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
const { SubMenu } = Menu;

export default React.memo(SiderMenu);
function SiderMenu(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKeys, setSelctedKeys] = useState([]);
    // 动态生成菜单项（方法1：map + 函数递归）
    const renderRoutes = (props, menuList) => {
        if (Array.isArray(menuList)) {
            const result = menuList.map((item, index) => {
                return renderRoute(props, item)
            })
            return result;
        }
    };
    const renderRoute = (props, item) => {
        const icon = React.createElement(
            Icon[item.icon],
            {
                style: {
                    fontSize: '16px'
                }
            }
        )
        if (item.subNodeFlag === "0") {
            return (
                <Menu.Item
                    url={item.url}
                    key={item.key}
                    icon={icon}
                >
                    <span>{item.title}</span>
                </Menu.Item>
            )
        }
        // 还有下一级菜单
        else {
            return (
                <SubMenu
                    key={item.key}
                    icon={icon}
                    title={item.title}
                >
                    {renderRoutes(props, item.children)}
                </SubMenu>
            )
        }
    };

    //  方法二（reduce + 函数递归）
    const renderRoutes2 = (props, menuList) => {
        if (Array.isArray(menuList)) {
            const result = menuList.reduce((pre, item) => {
                const icon = React.createElement(
                    Icon[item.icon],
                    {
                        style: {
                            fontSize: '16px'
                        }
                    }
                )
                if (item.subNodeFlag === "0") {
                    pre.push(
                        <Menu.Item
                            url={item.url}
                            key={item.key}
                            icon={icon}
                        >
                            <span>{item.title}</span>
                        </Menu.Item>
                    )
                } else {
                    pre.push(
                        <SubMenu
                            key={item.key}
                            icon={icon}
                            title={item.title}
                        >
                            {renderRoutes2(props, item.children)}
                        </SubMenu>
                    )
                }
                // 返回前一次统计的值
                return pre;
            }, [])
            return result;
        }
    }

    // 点击菜单
    const onClick = (item) => {
        if (item.keyPath.length >= 1) {
            const path = item.keyPath.reverse().join('/');
            navigate(path);
        } else {
            navigate(item.key);
        }
           setSelctedKeys([item.key]);
    };

    const onOpenChange = (a) => {
        console.log(1111, a);
    }

    useEffect(() => {
        const index = location.pathname.lastIndexOf('/');
        const selectKey = location.pathname.substring(index + 1);
        setSelctedKeys([selectKey]);
    }, [location]) 

    return (
        <div>
            <Menu
                selectedKeys={selectedKeys}
                openKeys={["consumer"]}
                mode="inline"
                theme="dark"
                onClick={onClick}
                onOpenChange={onOpenChange}
            >
                {
                    renderRoutes(props, menuList)
                }
            </Menu>
        </div>
    )
}
