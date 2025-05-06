import React, { useState } from 'react';
import { Table, Button, Popconfirm, Space, message, Tag } from 'antd';
import data from './data.json';
import WheelEditForm from '../WheelEditForm/WheelEditForm';
import { 
  EditOutlined, 
  DeleteOutlined,
  CheckCircleOutlined,  
  CloseCircleOutlined,  
  ClockCircleOutlined, 
  ExclamationCircleOutlined  
} from '@ant-design/icons';
import styles from './WheelsList.module.css';
import WheelAddForm from '../WheelAddForm/WheelAddForm';

function WheelsList() {
    const [showModal, setShowModal] = useState(false);
     const [showEdit, setShowEdit] = useState(false);
    const { wheelsData } = data;

    

    const handleDelete = (record) => {
        message.success(`Запись с ID: ${record.id} удалена`);
    };

    const isActive = (record) => {
        return record.Status === 'active';
    };

    // Функция для отображения статуса с иконкой
    const renderStatus = (status) => {
        let icon, color, text;
        
        switch(status) {
            case 'active':
                icon = <CheckCircleOutlined />;
                color = 'green';
                text = 'Активно';
                break;
            case 'inactive':
                icon = <CloseCircleOutlined />;
                color = 'orange';
                text = 'Неактивно';
                break;
            case 'archived':
                icon = <ClockCircleOutlined />;
                color = 'grey';
                text = 'В архиве';
                break;
            default:
                icon = <ExclamationCircleOutlined />;
                color = 'gray';
                text = 'Неизвестно';
        }

        return (
            <Tag icon={icon} color={color}>
                {text}
            </Tag>
        );
    };
    
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Название акции',
            dataIndex: 'Название акции',
            key: 'Название акции',
        },
        {
            title: 'Период активности',
            dataIndex: 'Период активности',
            key: 'Период активности',
        },
        {
            title: 'Статус',
            dataIndex: 'Status',
            key: 'Status',
            render: (status) => renderStatus(status),
        },
        {
            title: 'Действия',
            key: 'Действия',
            width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <Button 
                        type="text" 
                        icon={<EditOutlined />} 
                        onClick={() => setShowEdit(true)}
                    />
                    {!isActive(record) && 
                    <Popconfirm
                        title="Вы уверены, что хотите удалить эту запись?"
                        onConfirm={() => handleDelete(record)}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button 
                            type="text" 
                            danger 
                            icon={<DeleteOutlined />} 
                        />
                    </Popconfirm>
                    }
                </Space>
            ),
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.tableHeader}>
                <h2>Список акционных колес</h2>
                <Button type="primary" className={styles.add_button} onClick={()=> setShowModal(true)}>
                    Добавить новое колесо
                </Button>
            </div>
            <Table
                pagination={false}
                columns={columns} 
                dataSource={wheelsData} 
                className={styles.table} 
                scroll={{ x: true }}
                rowKey="id"
            />
            <WheelAddForm open={showModal} onCancel={() => setShowModal(false)}/>
            <WheelEditForm open={showEdit} onCancel={() => setShowEdit(false)}/>    
        </div>
    );
}

export default WheelsList;