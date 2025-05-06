import React from 'react';
import styles from './BurgerMenu.module.css';
import { Button, Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

function BurgerMenu() {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [current, setCurrent] = useState('1');

    const items = [
        { 
            key: '1', 
            icon: <img src="/look.svg" alt="" />, 
            label: 'Просмотр всех колес',
            path: '/',
            className: cn(styles.menuItem, { [styles.active]: current === '1' })
        },
        // { 
        //     key: 'settings', 
        //     icon: <img src="/settings.svg" alt="" />, 
        //     label: 'Настройка колеса',
        //     path: '/settings',
        //     className: cn(styles.menuItem, { [styles.active]: current === 'settings' })
        // },
        { 
            key: 'addPrize', 
            icon: <img src="/prize.svg" alt="" />, 
            label: 'Добавить приз',
            path: '/add-prize',
            className: cn(styles.menuItem, { [styles.active]: current === 'addPrize' }),
            children: [
                { key: '11', label: 'Промокоды' },
                { key: '12', label: 'Вещественные призы' },
                { key: '13', label: 'Попытка' },
                { key: '14', label: 'Пустые призы' },
    ],
        },
        { 
            key: 'users', 
            icon: <img src="/users.svg" alt="" />, 
            label: 'Пользователи',
            path: '/users',
            className: cn(styles.menuItem, { [styles.active]: current === 'users' })
        },
    ];

    const handleMenuClick = (e) => {
        setCurrent(e.key);
        const selectedItem = items.find(item => item.key === e.key);
        if (selectedItem && selectedItem.path) {
            navigate(selectedItem.path);
        }
    };

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div style={{ width: 256 }} className={styles.menu}>
            <Button type="primary" onClick={toggleCollapsed} className={styles.menu__button}>
                <img src="/menu.svg" alt="Иконка меню" />
            </Button>
            <Menu
                selectedKeys={[current]} 
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                items={items.map(item => ({
                    ...item,
                    className: cn(styles.menuItem, { [styles.active]: current === item.key })
                }))}
                onClick={handleMenuClick}
            />
        </div>
    );
}

export default BurgerMenu;