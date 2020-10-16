import React, { useState, useEffect } from 'react';
import '../style/handleJudge.css'
import { Form, Input, Button, Radio  } from 'antd';
import Http from '../http'
import Avatar from './Avatar'

const { TextArea } = Input;

function HandleFill (props) {

    const onFinish = async (values) => {
        if(props.location.query) {
            var result = await Http.updateFill({
                id: props.location.query.id,
                title: values.title, 
                answer: values.answer,
                lanId: values.lanId,
                img
            })
        } else {
            var result = await Http.addFill({
                title: values.title, 
                answer: values.answer,
                lanId: values.lanId,
                img
            })
        }
        if(result.status === 200) {
            props.history.goBack()
        }
      };

    function close () {
        props.history.goBack()
    }

    const [ lanId, setLanId] = useState(0)
    const [ img, setImg ] = useState('');
    useEffect(()=> {
        if(props.location.query) {
            setLanId(props.location.query.lanId)
            setImg(props.location.query.img)
        }
    }, [])

    return (
        <div className='judge-wrap'>
            <div className='judge-container' style={{height: '530px'}}>
                <div className="top">
                    <div className="operation">
                        {
                            props.location.query?'编辑填空题':'新增填空题'
                        }
                    </div>
                    <div className="close" onClick={close}>X</div>
                </div>
                <Form
                name="basic"
                initialValues={props.location.query}
                className='judge-form'
                labelCol={{span: 5}}
                wrapperCol= {{ span: 16, offset: 1 }}
                onFinish={onFinish}
                >
                <Form.Item
                    label="题目"
                    name="title"
                    rules={[{ required: true, message: '请输入题目!' }]}
                >
                    <TextArea />
                </Form.Item>

                <Form.Item label="答案" name="answer"
                    rules={[{ required: true, message: '请选择答案!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="试卷类型"  name="lanId"
                    rules={[{ required: true, message: '请选择试卷类型!' }]}
                >
                    <Radio.Group value={lanId} onChange={(e)=> {setLanId(e.target.value)}}>
                        <Radio value={1}>JAVA</Radio>
                        <Radio value={2}>c语言</Radio>
                        <Radio value={3}>数据结构</Radio>
                        <Radio value={4}>算法</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="img"
                    label="题目图片"
                    wrapperCol= {{ span: 5, offset: 1 }}
                    // rules={[{ required: true, message: '请输入分数!' }]}
                >
                    <Avatar setImg={setImg} />
                </Form.Item>

                <Form.Item wrapperCol= {{ offset: 19, span: 5 }}>
                    <Button type="primary" htmlType="submit">
                    确定
                    </Button>
                </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default HandleFill