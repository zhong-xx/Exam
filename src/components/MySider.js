import React, { useEffect, useState} from 'react';
import { Menu } from 'antd';

function MySider(props) {
    console.log(props)
    const [current, setCurrent ] = useState('select')
    let handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key)
        props.props.history.push(`/main/${e.key}Manage`)
    };

    useEffect(()=> {
        switch(props.props.location.pathname) {
            case '/main/selectManage':
                setCurrent('select')
                break;
            case '/main/fillManage':
                setCurrent('fill')
                break;
            case '/main/judgeManage':
                setCurrent('judge')
                break;
        }
    })

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} theme='dark'>
            <Menu.Item key="select" icon={
                <svg className="icon" aria-hidden="true" style={{fontSize: '20px', marginRight: '4px'}}>
                    <use xlinkHref="#icon-xuanzeti"></use>
                </svg>}>
            选择题管理
            </Menu.Item>
            <Menu.Item key="fill" icon={
                <svg className="icon" aria-hidden="true" style={{fontSize: '18px', marginRight: '4px'}}>
                    <use xlinkHref="#icon-tiankongti"></use>
                </svg>
            }>
            填空题管理
            </Menu.Item>
            <Menu.Item key="judge" icon={
                <svg className="icon" aria-hidden="true" style={{fontSize: '18px', marginRight: '4px'}}>
                    <use xlinkHref="#icon-panduanti"></use>
                </svg>
            }>
            判断题管理
            </Menu.Item>
            <Menu.Item key="user" icon={
                <svg className="icon" aria-hidden="true" style={{fontSize: '16px', marginRight: '4px'}}>
                    <use xlinkHref="#icon-yonghu"></use>
                </svg>
            }>
            用户管理
            </Menu.Item>
        </Menu>
    )
}

export default MySider;