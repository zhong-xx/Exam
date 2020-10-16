import React, { useEffect, useState} from 'react';
import { Menu } from 'antd';
import { withRouter, Link } from 'react-router-dom';

function MySider(props) {
    const [current, setCurrent ] = useState('select')
    let handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key)
    };

    useEffect(()=> {
        switch(props.location.pathname) {
            case '/main/selectManage':
            case '/main/selectManage/add':
            case '/main/selectManage/update':
                setCurrent('select')
                break;
            case '/main/fillManage':
            case '/main/fillManage/add':
            case '/main/fillManage/update':
                setCurrent('fill')
                break;
            case '/main/judgeManage':
            case '/main/judgeManage/add':
            case '/main/judgeManage/update':
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
            
                <Link to='/main/selectManage'>选择题管理</Link>
            </Menu.Item>
            <Menu.Item key="fill" icon={
                <svg className="icon" aria-hidden="true" style={{fontSize: '18px', marginRight: '4px'}}>
                    <use xlinkHref="#icon-tiankongti"></use>
                </svg>
            }>
                <Link to='/main/fillManage'>填空题管理</Link>
            </Menu.Item>
            <Menu.Item key="judge" icon={
                <svg className="icon" aria-hidden="true" style={{fontSize: '18px', marginRight: '4px'}}>
                    <use xlinkHref="#icon-panduanti"></use>
                </svg>
            }>
                <Link to='/main/judgeManage'>判断题管理</Link>
            
            </Menu.Item>
        </Menu>
    )
}
MySider =  withRouter(MySider)
export default MySider;