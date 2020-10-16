import React from 'react';
import { Layout, Button } from 'antd';
import '../style/main.css'
import MySider from '../components/MySider'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'
import SelectManage from '../components/SelectManage'
import FillManage from '../components/FillManage'
import JudgeManage from '../components/JudgeManage'
import HandleJudge from '../components/HandleJudge'
import HandleFill from '../components/HandleFill'
import HandleSelect from '../components/HandleSelect'

const { Header, Sider, Content } = Layout;

function Main(props) {
    const jwttoken = sessionStorage.getItem('jwttoken');
    return (
        <Layout style={{height: '100%'}}>
            {
                jwttoken? '': <Redirect to='/' />
            }
            <Header style={{background: 'rgb(9,25,42)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1 className='title' style={{margin: '0'}}>考试管理</h1>
                <Link to='/' ><Button type="primary" onClick={function () {
                    sessionStorage.removeItem('jwttoken')
                }}>退出</Button></Link>
            </Header>
            <Layout>
                <Sider style={{background: 'rgb(9,25,42)'}}><MySider props={props} /></Sider>
                <Content style={{background: 'white'}}>
                    <Route path='/main/selectManage' component={SelectManage}/>
                    <Route path='/main/fillManage' component={FillManage}/>
                    <Route path='/main/judgeManage' component={JudgeManage}/>
                </Content>
            </Layout>
            <Route path='/main/judgeManage/add' component={HandleJudge}/>
            <Route path='/main/judgeManage/update' component={HandleJudge}/>
            <Route path='/main/fillManage/add' component={HandleFill}/>
            <Route path='/main/fillManage/update' component={HandleFill}/>
            <Route path='/main/selectManage/add' component={HandleSelect}/>
            <Route path='/main/selectManage/update' component={HandleSelect}/>
        </Layout>
    )
}

export default Main;