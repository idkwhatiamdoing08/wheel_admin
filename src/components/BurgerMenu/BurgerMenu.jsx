import React from "react";
import styles from "./BurgerMenu.module.css";
import { Button, Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";

function BurgerMenu() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("1");

  const items = [
    {
      key: "1",
      icon: <img src="/look.svg" alt="" />,
      label: "Просмотр всех колес",
      path: "/wheels",
      className: cn(styles.menuItem, { [styles.active]: current === "1" }),
    },

    {
      key: "addPrize",
      icon: <img src="/prize.svg" alt="" />,
      label: "Призы",
      path: "/add-prize",
      className: cn(styles.menuItem, {
        [styles.active]: current === "addPrize",
      }),
      children: [
        {
          key: "promo",
          label: "Промокоды",
          path: "/promo",
          className: cn(styles.menuItem, {
            [styles.active]: current === "promo",
          }),
        },
        {
          key: "12",
          label: "Вещественные призы",
          path: "/physical-prizes",
          className: cn(styles.menuItem, { [styles.active]: current === "12" }),
        },
        {
          key: "13",
          label: "Попытка",
          path: "/attempt",
          className: cn(styles.menuItem, { [styles.active]: current === "13" }),
        },
        {
          key: "14",
          label: "Пустые призы",
          path: "/empty-prizes",
          className: cn(styles.menuItem, { [styles.active]: current === "14" }),
        },
      ],
    },
    {
      key: "users",
      icon: <img src="/users.svg" alt="" />,
      label: "Пользователи",
      path: "/users",
      className: cn(styles.menuItem, { [styles.active]: current === "users" }),
    },
  ];

  const findItemByKey = (key) => {
    let foundItem = items.find((item) => item.key === key);
    if (!foundItem) {
      for (const item of items) {
        if (item.children) {
          const childItem = item.children.find((child) => child.key === key);
          if (childItem) {
            foundItem = childItem;
            break;
          }
        }
      }
    }

    return foundItem;
  };

  const handleMenuClick = (e) => {
    setCurrent(e.key);
    const selectedItem = findItemByKey(e.key);
    if (selectedItem && selectedItem.path) {
      navigate(selectedItem.path);
    }
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ width: 256 }} className={styles.menu}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        className={styles.menu__button}
      >
        <img src="/menu.svg" alt="Иконка меню" />
      </Button>
      <Menu
        selectedKeys={[current]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items.map((item) => ({
          ...item,
          className: cn(styles.menuItem, {
            [styles.active]: current === item.key,
          }),
          children: item.children?.map((child) => ({
            ...child,
            className: cn(styles.menuItem, {
              [styles.active]: current === child.key,
            }),
          })),
        }))}
        onClick={handleMenuClick}
      />
    </div>
  );
}

export default BurgerMenu;
