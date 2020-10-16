import React, { useEffect, useState } from 'react';
import '../style/handleJudge.css'
import { Form, Input, Button, Radio, Steps, message  } from 'antd';
import Avatar from './Avatar'
import Http from '../http'
const { Step } = Steps;


const { TextArea } = Input;

function First (props) {

    if(!props.title && props.update) return null
    return (
        <Form
        name="basic"
        className='judge-form'
        labelCol={{span: 5}}
        wrapperCol= {{ span: 16, offset: 1 }}
        >
        <Form.Item
            label={"题目"}
            name="title"
            rules={[{ required: true, message: '请输入题目!' }]}
        >
            <TextArea defaultValue={props.title} onChange={(e)=> {props.setTitle(e.target.value)}} />
        </Form.Item>

        <Form.Item label="答案" name="answer"
            rules={[{ required: true, message: '请选择答案!' }]}
        >
            <Input defaultValue={props.answer} value={11} onChange={(e)=> {props.setAnswer(e.target.value)}}  />
        </Form.Item>

        <Form.Item label="试卷类型"  name="lanId"
            rules={[{ required: true, message: '请选择试卷类型!' }]}
        >
            <Radio.Group defaultValue={props.lanId} onChange={(e)=> {props.setLanId(e.target.value)}}>
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
            <Avatar setImg={props.setImg} />
        </Form.Item>
        </Form>
    )
}

function Second (props) {

    return (
        <Form
        name="basic"
        className='judge-form'
        labelCol={{span: 5}}
        wrapperCol= {{ span: 16, offset: 1 }}
        >
    
        <Form.Item label="A：" name="itemA"
            rules={[{ required: true, message: '请输入!' }]}
        >
            <Input defaultValue={props.itemA}  onChange={(e)=> {props.setItemA(e.target.value)}} />
        </Form.Item>

        <Form.Item label="B：" name="itemB"
            rules={[{ required: true, message: '请输入!' }]}
        >
            <Input defaultValue={props.itemB} onChange={(e)=> {props.setItemB(e.target.value)}} />
        </Form.Item>

        <Form.Item label="C：" name="itemC"
            rules={[{ required: true, message: '请输入!' }]}
        >
            <Input defaultValue={props.itemC} onChange={(e)=> {props.setItemC(e.target.value)}} />
        </Form.Item>

        <Form.Item label="D：" name="itemD"
            rules={[{ required: true, message: '请输入!' }]}
        >
            <Input defaultValue={props.itemD} onChange={(e)=> {props.setItemD(e.target.value)}} />
        </Form.Item>

        {/* <Form.Item wrapperCol= {{ offset: 19, span: 5 }}>
            <Button type="primary" htmlType="submit">
            确定
            </Button>
        </Form.Item> */}
        </Form>
    )
}

function HandleSelect (props) {

    const [ title, setTitle ] = useState('');
    const [ answer, setAnswer ] = useState('');
    const [ lanId, setLanId ] = useState(0);
    const [ img, setImg ] = useState('');
    const [ itemA, setItemA ] = useState('');
    const [ itemB, setItemB ] = useState('');
    const [ itemC, setItemC ] = useState('');
    const [ itemD, setItemD ] = useState('');
    let update = false

    console.log(props.location.query)

    useEffect(()=> {
        if(props.location.query) {
            setAnswer(props.location.query.answer)
            setLanId(props.location.query.lanId)
            setTitle(props.location.query.title)
            setImg(props.location.query.img)
            setItemA(props.location.query.itemA)
            setItemB(props.location.query.itemB)
            setItemC(props.location.query.itemC)
            setItemD(props.location.query.itemD)
        }
    }, [])

    if(props.location.query) {
        update = true
    }
    

    function close () {
        props.history.goBack()
    }

    const steps = [
        {
            title: '步骤一',
            content: <First title={title} answer={answer} lanId={lanId} img={img} update={update}
            setTitle={setTitle} setAnswer={setAnswer} setLanId={setLanId} setImg={setImg} 
            />,
        },
        {
            title: '步骤二',
            content: <Second itemA={itemA} itemB={itemB} itemC={itemC} itemD={itemD} 
            setItemA={setItemA} setItemB={setItemB} setItemC={setItemC} setItemD={setItemD} 
             />,
        }
    ];

    const [ current, setCurrent ] = useState(0)

    function next() {
        setCurrent(current + 1)
    }

    function prev() {
        setCurrent(current - 1)
    }

    async function submit () {
        if(props.location.query) {
            const result = await Http.updateSelect({id: props.location.query.id, answer, lanId, title, img, itemA, itemB, itemC, itemD})
            if(result.status) {
                message.success('编辑成功');
                props.history.goBack()
            }
        } else {
            const result = await Http.addSelect({answer, lanId, title, img, itemA, itemB, itemC, itemD})
            if(result.status) {
                message.success('新增成功');
                props.history.goBack()
            }
        }
    }

    return (
        <div className='judge-wrap'>
            <div className='judge-container' style={{height: '570px'}}>
                <div className="top">
                    <div className="operation">
                        {
                            props.location.query?'编辑选择题':'新增选择题'
                        }
                    </div>
                    <div className="close" onClick={close}>X</div>
                </div>

                <Steps current={current} style={{padding: '0 50px', paddingTop: '20px'}}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
                <div className="steps-action" style={{padding: '0 50px'}}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={next}>
                    下一步
                    </Button>
                )}
                {/* {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={prev}>
                    Previous
                    </Button>
                )} */}
                {current === steps.length - 1 && (
                    <Button type="primary" style={{float: 'right'}} onClick={submit}>
                    确定
                    </Button>
                )}
                </div>

            </div>
        </div>
    )
}

export default HandleSelect