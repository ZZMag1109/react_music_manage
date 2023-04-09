import React, { useState, useEffect } from 'react'
import './style.less'
import { Button, Form, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { getLoginStatus } from '../../api/index'
import { useNavigate, Navigate } from 'react-router-dom';
import { message } from 'antd';
import storageUtils from '../../utils/storageUtils';

export default React.memo(Login);
function Login(props) {
    const navigate = useNavigate();
    const formObj = {
        useName: "",
        password: "",
    };
    const [formData, setFormData] = useState(formObj);

    // 更新登录form表单
    const updateForm = (val) => {
        setFormData((formData) => ({ ...formData, ...val }))
    }

    // 控制表单布局
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    }

    //登录
    const submitForm = async (e) => {
        e.preventDefault();
        let res = await getLoginStatus({
            name: formData.useName,
            password: formData.password
        });
        //登陆成功
        if (res && res.head && res.head.code == "1") {
            message.success(res.head.msg);
            //将usera信息保存到local中
            const user = res.body;
            storageUtils.saveUser(user);
            navigate('/admin', { replace: true });
        }
    }

    useEffect(() => {
        //读取保存的user信息，如果不存在，直接跳转到登录界面
        const user = storageUtils.getUser();
        if (user.id) {
            navigate('/admin', { replace: true });
        }
    }, [])

    return (
        <div className='login-wrap'>
            <div className='ms-title'>音乐网站后台管理登录</div>
            <div className='ms-login'>
                <Form
                    name="login"
                >
                    <Form.Item
                        label="用户名"
                        name="用户名"
                        {...formItemLayout}
                        rules={[{ required: true, message: "请输入用户名" }]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} onChange={e => updateForm({ useName: e.target.value })}></Input>
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="密码"
                        {...formItemLayout}
                        rules={[{ required: true, message: "请输入密码" }]}>
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} autoComplete="new-password" onChange={e => updateForm({ password: e.target.value })}></Input.Password>
                    </Form.Item>
                    <Form.Item>
                        <div className='login-btn'>
                            <Button type='primary' htmlType='submit' onClick={submitForm}>登录</Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
