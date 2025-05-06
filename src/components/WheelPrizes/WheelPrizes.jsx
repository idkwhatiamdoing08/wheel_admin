import React from 'react'
import { Table, Button, Popconfirm, Space, message, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import ModalForm from '../ModalForm/ModalForm';

import { useState } from 'react';
import './WheelPrizes.css'

function WheelPrizes() {
    const headers = ['Тип приза', 'Название', 'Значение', 'Вероятность', 'Лимит', 'Статус'];
    const [isModalVisible, setIsModalVisible] = useState(false); 
  
  const [data, setData] = useState([
    {
      key: '1',
      'Тип приза': 'Деньги',
      'Название': 'Выигрыш 1000$',
      'Значение': '1000',
      'Вероятность': '1%',
      'Лимит': '10',
      'Статус': 'Активен',
    },
    {
      key: '2',
      'Тип приза': 'Бонусы',
      'Название': '100 бонусов',
      'Значение': '100',
      'Вероятность': '5%',
      'Лимит': '50',
      'Статус': 'Активен',
    },
  ]);

  const handleDelete = (key) => {
    setData(data.filter(item => item.key !== key));
    message.success('Запись удалена');
  };

  const columns = [
    ...headers.map(header => ({
      title: header,
      dataIndex: header,
      key: header,
    })),
    {
      title: 'Действия',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Удалить запись?"
            description="Вы уверены, что хотите удалить эту запись?"
            onConfirm={() => handleDelete(record.key)}
            okText="Да"
            cancelText="Нет"
          >
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              shape="circle" 
            />
          </Popconfirm>
          <Button 
              danger 
              icon={<EditOutlined />} 
              shape="circle"
              />
        </Space>

      ),
    },
  ];
  return (
     <>
     <h1 className='h1'>Призы</h1>
      <div className='add-button'>
        Добавить приз
        <Button
        icon={<PlusOutlined />}
        shape='circle'
      />
      </div>
      
      
      <Table 
        columns={columns} 
        dataSource={data} 
        className="table" 
        scroll={{ x: true }}
        />
        {/* <Modal 
                title="Редактировать приз" 
                open={isModalVisible} 
                onCancel={setIsModalVisible(false)}
                footer={null}
            >
                <ModalForm text='Редактировать приз'/>
            </Modal> */}
    </>
  )
}

export default WheelPrizes