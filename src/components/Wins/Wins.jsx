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

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://try-your-luck.worktools.space/api/user-prize?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const result = response.data;
      const formatted = result.data.map((item) => ({
        key: item.id.toString(),
        name: item.user.username,
        prize: item.prize.name,
        date: item.date,
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

  const handleTableChange = (pagination) => {
    fetchUsers(pagination.current);
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
      align: "center",
    },
  ];

  return (
    <div className={styles.users__wrapper}>
      <h2 className={styles.users__title}>Выигрыши</h2>

      <Table
        dataSource={userData}
        columns={columns}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        className={styles.users__table}
      />
    </div>
  );
}

export default Wins;
