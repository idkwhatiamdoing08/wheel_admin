import React, { useEffect, useState } from "react";
import styles from "./Wins.module.css";
import { Table, message } from "antd";
import axios from "axios";

function Wins() {
  const [userData, setUserData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (page = 1, pageSize = pagination.pageSize) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://try-your-luck.worktools.space/api/user-prize?page=${page}&per_page=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response);

      const result = response.data;
      const formatted = result.data.map((item) => ({
        key: item.id.toString(),
        name: item.user.username,
        prize: item.prize.name,
        date: item.date,
        id_wheel: item.wheel.id,
        wheel: item.wheel.name,
      }));

      setUserData(formatted);
      setPagination({
        current: result.current_page,
        pageSize: result.per_page,
        total: result.total,
      });
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      message.error("Не удалось загрузить данные");
    } finally {
      setLoading(false);
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
      title: "username",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Приз",
      dataIndex: "prize",
      key: "prize",
    },
    {
      title: "Дата выигрыша",
      dataIndex: "date",
      key: "date",
      width: 200,
      align: "center",
    },
    {
      title: "id колеса",
      dataIndex: "id_wheel",
      key: "id_wheel",
      align: "center",
    },
    {
      title: "Название колеса",
      dataIndex: "wheel",
      key: "wheel",
      align: "center",
      width: 200,
    },
  ];

  return (
    <div className={styles.users__wrapper}>
      <h2 className={styles.users__title}>Выигрыши</h2>

      <Table
        dataSource={userData}
        columns={columns}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
          showTotal: (total) => `Всего ${total} записей`,
        }}
        loading={loading}
        onChange={handleTableChange}
        className={styles.users__table}
      />
    </div>
  );
}

export default Wins;
