import React, { useState } from 'react'
import './style.less'
import { Button, Form, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

export default function Login() {
    const formObj = {
        useName: "",
        Password: "",
    };
    const [ formData, setFormData ] = useState(formObj);

    // 更新登录form表单
    const updateForm = (val) => {
        setFormData((formData) => ({ ...formData, ...val }))
    }

    // 控制表单布局
    const formItemLayout = {
        labelCol: { span: 6},
        wrapperCol: { span: 16},
    }


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
                rules={[{ required: true, message: "请输入用户名"}]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} onChange={e => updateForm({ useName: e.target.value})}></Input>
                </Form.Item>
                <Form.Item
                label="密码"
                name="密码"
                {...formItemLayout}
                rules={[{ required: true, message: "请输入密码"}]}>
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} autoComplete="new-password" onChange={e => updateForm({ password: e.target.value})}></Input.Password>
                </Form.Item>
                <Form.Item>
                  <div className='login-btn'>
                      <Button type='primary' htmlType='submit' onClick="">登录</Button>
                  </div>
                </Form.Item>
            </Form>
            </div>
        </div>
    )
}
