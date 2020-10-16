import React from 'react';
import ReactDom from 'react-dom'
import 'antd/dist/antd.css';
import Login from './pages/Login'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Main from './pages/Main'

function Exam () {
    const jwttoken = sessionStorage.getItem('jwttoken');
    return (
        <Router style={{height: '100%'}}>
            {
                jwttoken? '': <Redirect to='/' />
            }
            <Route path='/' exact component={Login}></Route>
            <Route path='/main' component={Main}></Route>
        </Router>
    )
}

ReactDom.render(<Exam />, document.getElementById('root'))