import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import styles from "./WheelUsers.module.css";
import axios from "axios";

function WheelUsers() {
  const [userData, setUserData] = useState(null);
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://try-your-luck.worktools.space/api/users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response);
      const formatted = response.data.data.map((user, index) => ({
        key: user.id.toString(),
        id: index + 1,
        name: `${user.surname} ${user.name} ${user.patronymic}`,
        role: user.role,
      }));
      setUserData(formatted);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ФИО",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Роль",
      dataIndex: "role",
      key: "role",
      align: "center",
    },
  ];

  return (
    <div className={styles.users__wrapper}>
      <h2 className={styles.users__title}>Пользователи</h2>

      <Table
        dataSource={userData}
        columns={columns}
        pagination={false}
        className={styles.users__table}
      />
    </div>
  );
}

export default WheelUsers;
