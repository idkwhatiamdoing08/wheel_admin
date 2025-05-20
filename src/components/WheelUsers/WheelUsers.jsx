import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import styles from "./WheelUsers.module.css";
import axios from "axios";

function WheelUsers() {
  const [userData, setUserData] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const fetchUsers = async (page = 1, pageSize = pagination.pageSize) => {
    try {
      const response = await axios.get(
        `http://try-your-luck.worktools.space/api/users?page=${page}&per_page=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response);

      const formatted = response.data.data.map((user, index) => ({
        key: user.id.toString(),
        id: `${(page - 1) * pageSize + index + 1}`,
        name: `${user.surname} ${user.name} ${user.patronymic}`,
        role: user.role,
      }));
      setUserData(formatted);
      setPagination({
        current: response.data.current_page,
        pageSize: response.data.per_page,
        total: response.data.total,
      });
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
    fetchUsers(newPagination.current, newPagination.pageSize);
  };

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
        className={styles.users__table}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          showTotal: (total) => `Всего ${total} пользователей`,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default WheelUsers;
