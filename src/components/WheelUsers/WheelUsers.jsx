import React from 'react';
import { Table, Tag } from 'antd';
import styles from './WheelUsers.module.css';

function WheelUsers() {
    const dataSource = [
        {
            key: '1',
            id: '001',
            name: 'Ренжина Александра Сергеевна',
            attempts: 1,
        },
        {
            key: '2',
            id: '002',
            name: 'Курякова Анастасия Сергеевна',
            attempts: 0,
        },
        {
            key: '3',
            id: '003',
            name: 'Денисова Дарья',
            attempts: 0,
        },
        {
            key: '4',
            id: '004',
            name: 'Иванов Александр Николаевич',
            attempts: 5,
        },
    ];

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'ФИО',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Количество попыток',
            dataIndex: 'attempts',
            key: 'attempts',
            align: 'center'
        },
    ];

    return (
        <div className={styles.users__wrapper}>
            <h2 className={styles.users__title}>Пользователи</h2>
            <div className={styles.users__note}>Максимальное количество попыток: 5</div>
            <Table 
                dataSource={dataSource} 
                columns={columns} 
                pagination={false}
                className={styles.users__table}
            />
        </div>
    );
}

export default WheelUsers;