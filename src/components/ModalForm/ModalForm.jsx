import React from 'react'
import { Button, Form, Input, Select, InputNumber } from 'antd';

function ModalForm({ text }) {
    const onFinish = values => {
        console.log('Success:', values);
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
  return (
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Название приза"
      name="prizeName"
      rules={[{ required: true, message: 'Введите название приза!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item name="prizeType" label="Тип приза" rules={[{ required: true }]}>
        <Select
          placeholder="Выберите тип приза"
          allowClear
        >
          <Option value="promo">Промокод</Option>
          <Option value="realThing">Вещественный приз</Option>
          <Option value="try">Попытки</Option>
          <Option value="emptyPrize">Пустой приз</Option>
        </Select>
      </Form.Item>
    <Form.Item
        label="Вероятность"
        name="probability"
        rules={[{ required: true, message: 'Введите вероятность' }]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        {text}
      </Button>
    </Form.Item>
  </Form>
  )
}

export default ModalForm