import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Button } from 'antd'
import Http from '../http'

function FillManage () {
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
        {title: '答案', dataIndex: 'answer', align: 'center'},
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
        let result = await Http.getFillList(1, 10, 0)
        setDataSource(result.data.questions)
        setTotal(result.data.count)
        return ()=> {}
    }, [])

    return (
        <div>
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
                // expandable={{ expandedRowRender }}
            />
        </div>
        </div>
    )
}

export default FillManage