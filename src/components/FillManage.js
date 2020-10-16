import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Button, message, Select } from 'antd'
import Http from '../http'
import { Link } from 'react-router-dom'
import { StoreProperty } from '../property'
import '../style/selectManage.css'

const { Option } = Select;

function FillManage (props) {
    const columns = [
        {title: '题目标题', dataIndex: 'title'},
        
        {title: '分值', dataIndex: 'value', align: 'center'},
        {title: '试卷类型', dataIndex: 'lanId', align: 'center', render: (text, index, record)=> {
            switch (text) {
                case 1: 
                    return 'JAVA'
                case 2:
                    return 'c语言'
                case 3:
                    return '数据结构'
                case 4:
                    return '算法'
            }
        }},
        {
            title: '操作',
            align: 'center',
            render: (text, record) =>
              dataSource.length >= 1 ? (
                <div>
                    <Link to={{pathname: '/main/fillManage/update', query: record}} style={{marginRight: '4px'}}>编辑</Link>
                    <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record.id)}>
                        <a style={{color: 'red'}}>删除</a>
                    </Popconfirm>
                </div>
              ) : null,
        }
    ]

    async function handleDelete (id) {
        var result = await Http.deleteFill(id)
        if(result.status === 200) {
            message.success('删除成功')
            let result = await Http.getFillList(StoreProperty.fill.pageNum, StoreProperty.fill.pageSize, StoreProperty.fill.lanId)
            setDataSource(result.data.questions)
            setTotal(result.data.count)
        }
    }

    async function onChange(page, pageSize) {
        StoreProperty.fill.pageNum = page;
        StoreProperty.fill.pageSize = pageSize;
        let result = await Http.getFillList(StoreProperty.fill.pageNum, StoreProperty.fill.pageSize, StoreProperty.fill.lanId)
        setDataSource(result.data.questions)
        setTotal(result.data.count)
    }

    const [ dataSource, setDataSource ] = useState([])
    const [ total, setTotal ] = useState(0)

    useEffect(()=> {
        StoreProperty.fill = {
            pageNum: 1,
            pageSize: 10,
            lanId: 0
        }
        Http.getFillList(1, 10, 0)
        .then((result)=> {
            setDataSource(result.data.questions)
            setTotal(result.data.count)
        })
    }, [])

    props.history.listen(route=> {
        if(route.pathname === '/main/fillManage') {
            Http.getFillList(StoreProperty.fill.pageNum, StoreProperty.fill.pageSize, StoreProperty.fill.lanId)
                .then(result=> {
                    setDataSource(result.data.questions)
                    setTotal(result.data.count)
                })
        }
    })

    function expandedRowRender (record, index, indent, expanded) {

        return (
            <div className='container'>
                <div style={{width: '60%', marginLeft: '100px'}}>
                    <div className='myTitle'>{record.title}</div>
                    <div className='item-container'>
                        <div>正确答案：</div>
                        <div>{record.answer}</div>
                    </div>
                </div>
                {
                    record.img ? <img src={'http://3463z0p267.goho.co/exam/'+record.img} className='img'/>: ''
                }
                
            </div>
        )
    }

    async function change(value) {
        StoreProperty.fill.lanId = value
        let result = await Http.getFillList(StoreProperty.fill.pageNum, StoreProperty.fill.pageSize, StoreProperty.fill.lanId)
        setDataSource(result.data.questions)
        setTotal(result.data.count)
    }

    return (
        <div>
            <div style={{padding: '20px'}}>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="选择一种考试类型"
                    optionFilterProp="children"
                    onChange={change}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value={1}>JAVA</Option>
                    <Option value={2}>c语言</Option>
                    <Option value={3}>数据结构</Option>
                    <Option value={4}>算法</Option>
                </Select>
                <Button type="primary" style={{ margin: 16, float: 'right' }}>
                <Link to='/main/fillManage/add'>新增</Link>
                </Button>
                <Table 
                    rowKey={function (record) {
                        return record.id
                    }}
                    bordered 
                    dataSource={dataSource} 
                    columns={columns} 
                    pagination={{ 
                        position: ['bottomRight'], 
                        onChange:onChange, 
                        total: total,
                        pageSizeOptions: [10, 20, 30],
                        showSizeChanger: true
                    }}
                    expandable={{ expandedRowRender }}
                />
            </div>
        </div>
    )
}

export default FillManage