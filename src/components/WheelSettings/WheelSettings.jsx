//import React, { useState } from 'react'
import { Button, Checkbox, Select, Space , Input, Modal, Form, InputNumber, DatePicker} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './WheelSettings.module.css';
import ModalForm from '../ModalForm/ModalForm';
import { useState } from 'react';

function WheelSettings() {
    const { RangePicker } = DatePicker;
    //const [selectedDate, setSelectedDate] = useState('');
      const [isModalVisible, setIsModalVisible] = useState(false);
       const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    
    const sectors = [];
    for(let i = 4; i < 11; i++ ) {
        sectors.push({ value: String(i), label: String(i) });
    }
   const attempts = [];
   for(let i = 0; i < 5; i ++) {
    attempts.push({ value: String(i + 1), label: String(i + 1) })
   } 

    const actionName = 'Апрельская акция';
    // const handleDateSelect = (date) => {
    //     console.log("Выбранная дата в WheelSettings:", date.format('YYYY-MM-DD'));
    //     setSelectedDate(date.format('YYYY-MM-DD'));
    // };
  return (
    <div className={styles.container}>
        
        <h2 className={styles.form_tittle}>Настройка</h2>
        <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        className={styles.form}
      >
        <Form.Item label="Статус" name="disabled" valuePropName="активно" className={styles.form_item}>
          <Checkbox>Активно</Checkbox>
        </Form.Item>
        <Form.Item label="Период" className={styles.form_item} >
          <RangePicker />
        </Form.Item>
        <Form.Item name="attemptsNumber" label="Количество попыток"   className={styles.form__attempts}>
            <Select
                placeholder="Количество попыток"
                allowClear
                options={attempts}
            >
            </Select>
        </Form.Item>
        <Form.Item name="attemptsNumber" label="Количество секторов">
            <Select
                placeholder="Количество секторов"
                allowClear
                options={sectors}
            >
            </Select>
        </Form.Item>
        <Form.Item label="Название акции">
          <Input />
        </Form.Item>
        
      </Form>
        
        
        <div>
            Добавить приз:
            <Button
            icon={<PlusOutlined />}
            shape='circle'
             onClick={showModal}/>
            
        

         <Modal 
                title="Добавить приз" 
                open={isModalVisible} 
                onCancel={handleCancel}
                footer={null}
            >
                <ModalForm text='Добавить приз' onCancel={handleCancel} />
            </Modal>
        
        </div>
    </div>
  )
}

export default WheelSettings