import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Button } from 'antd'
import Http from '../http'
import '../style/selectManage.css'

function SelectManage () {
    const columns = [
        {},
        {title: '题目标题', dataIndex: 'title'},
        
        {title: '分值', dataIndex: 'value', align: 'center'},
        {title: '试卷类型', dataIndex: 'lanId', align: 'center', render: (text, index, record)=> {
            switch (text) {
                case 1: 
                    return 'JAVA'
            }
        }},
        {
            title: '操作',
            align: 'center',
            render: (text, record) =>
              dataSource.length >= 1 ? (
                <div>
                    <a style={{marginRight: '4px'}}>编辑</a>
                    <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.key)}>
                        <a>删除</a>
                    </Popconfirm>
                </div>
              ) : null,
        }
    ]

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
    };

    async function onChange(page, pageSize) {
        console.log('Page: ', page, pageSize);
        let result = await Http.getSelectList(page, pageSize, 0)
        setDataSource(result.data.questions)
        setTotal(result.data.count)
    }

    const [ dataSource, setDataSource ] = useState([])
    const [ total, setTotal ] = useState(0)

    useEffect(async ()=> {
        let result = await Http.getSelectList(1, 10, 0)
        setDataSource(result.data.questions)
        setTotal(result.data.count)
        return ()=> {}
    }, [])

    function expandedRowRender (record, index, indent, expanded) {
        const list = [
            {label: '选项A：', content: record.itemA}, 
            {label: '选项B：', content: record.itemB}, 
            {label: '选项C：', content: record.itemC}, 
            {label: '选项D：', content: record.itemD}, 
        ]

        return (
            <div className='container'>
                <div style={{width: '60%'}}>
                    {
                        list.map((item, index)=> {
                            return (
                                <div key={item+index} className='item-container'>
                                    <div>{item.label}</div>
                                    <div>{item.content}</div>
                                </div>
                            )
                        })
                    }
                    <div className='item-container'>
                        <div>正确答案：</div>
                        <div>{record.answer}</div>
                    </div>
                </div>
                <img src={record.img} className='img'/>
            </div>
        )
    }

    return (
        <div style={{padding: '20px'}}>
            <Button type="primary" style={{ margin: 16, float: 'right' }}>新增</Button>
            <Table 
                rowKey={function (record) {
                    return record.id
                }}
                bordered 
                rowSelection={{type: 'checkbox', ...rowSelection}} 
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
    )
}

export default SelectManage