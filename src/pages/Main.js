import React from 'react';
import { Layout } from 'antd';
import '../style/main.css'
import MySider from '../components/MySider'
import { Route } from 'react-router-dom'
import SelectManage from '../components/SelectManage'
import FillManage from '../components/FillManage'

const { Header, Sider, Content } = Layout;

function Main(props) {
    return (
        <Layout style={{height: '100%'}}>
            <Header style={{background: 'rgb(9,25,42)'}}>
                <h1 className='title'>考试管理</h1>
            </Header>
            <Layout>
                <Sider style={{background: 'rgb(9,25,42)'}}><MySider props={props} /></Sider>
                <Content style={{background: 'white'}}>
                    <Route path='/main/selectManage' component={SelectManage}/>
                    <Route path='/main/FillManage' component={FillManage}/>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Main;