import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import '../style/login.css'
import { Link } from 'react-router-dom'
import Http from '../http'

let PhotoAuthCodeFlag = true; // 图片验证码防抖处理

function Login (props) {
    const onFinish = async (values) => {
        let result = await Http.login(values.username, values.password, values.code)
        if(result.data.code === '0000') {
            sessionStorage.setItem('jwttoken', result.headers.token)
            message.success(result.data.msg)
            props.history.push('/main/selectManage')
            return
        }
        message.warn(result.data.msg)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function handleClick (e) {
        e.stopPropagation()
        if (PhotoAuthCodeFlag) {
            PhotoAuthCodeFlag = false
            setTimeout(() => {
                PhotoAuthCodeFlag = true
            }, 1000)
            let img = document.getElementsByTagName('img')[0]
            img.src = img.src + 1
        } else {
            alert('你操作太频繁了')
        }
    }

    return (
        <div className='wrap'>
            <div className='form'>
                <h1 style={{textAlign: 'center'}}>Login</h1>
                <Form
                layout='vertical'
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <Input  className='form-item-input' />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                >
                    <Input.Password className='form-item-input'/>
                </Form.Item>

                <Form.Item
                    label="验证码"
                    name="code"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your code!',
                    },
                    ]}
                >
                    <Input className='form-item-input' style={{width: '50%'}} />
                </Form.Item>
                <img style={{position: 'relative', zIndex: '100'}} src='http://3463z0p267.goho.co/exam/imgcode?' onClick={handleClick} width='150px'/>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className='button'>
                    登录
                    </Button>
                </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login