import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button, Modal, Form, Input } from "antd";
import styles from "./WheelUsers.module.css";
import axios from "axios";
import { EditOutlined } from "@ant-design/icons";

function WheelUsers() {
  const [userData, setUserData] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
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

      const formatted = response.data.data.map((user, index) => ({
        key: user.id.toString(),
        id: `${(page - 1) * pageSize + index + 1}`,
        name: `${user.surname} ${user.name} ${user.patronymic}`,
        role: user.role,
        attempts: user.attempts,
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

  const handleEditClick = (record) => {
    setEditingUser(record);
    setShowModal(true);
    console.log(record);
    form.resetFields();
  };
  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
    fetchUsers(newPagination.current, newPagination.pageSize);
  };

  const handleAddAttempts = async () => {
    try {
      const values = await form.validateFields();
      const userId = editingUser.key;

      await axios.post(
        `http://try-your-luck.worktools.space/api/users/accrual-attempts/${userId}`,
        {
          attempts: values.attempts,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      setShowModal(false);
      fetchUsers(pagination.current, pagination.pageSize);
    } catch (error) {
      console.error("Ошибка при добавлении попыток:", error);
    }
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
    {
      title: "Количество попыток",
      dataIndex: "attempts",
      key: "attepts",
      align: "center",
    },

    {
      title: "Начисление попытки",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            onClick={() => handleEditClick(record)}
            icon={<EditOutlined />}
          />
        </Space>
      ),
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
      <Modal
        title={`Добавить попытки пользователю ${editingUser?.name}`}
        visible={showModal}
        onOk={handleAddAttempts}
        onCancel={() => setShowModal(false)}
        okText="Добавить"
        cancelText="Отмена"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="attempts"
            label="Количество попыток"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите количество попыток",
              },
              {
                pattern: /^[1-9]\d*$/,
                message: "Введите положительное число",
              },
            ]}
          >
            <Input type="number" min={1} placeholder="Введите число попыток" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default WheelUsers;
