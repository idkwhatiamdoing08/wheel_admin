import React, { useState, useEffect } from "react";
import { Table, Button, Space, message, Tag, Modal } from "antd";
import AddPrizeModal from "../AddPrizeModal";
import {
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import {
  fetchAttempts,
  addAttempt,
  deleteAttempt,
  updateAttempt,
} from "./AttemptsService";
import styles from "./Attempts.module.css";

function Attempts() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prizeData, setPrizeData] = useState([]);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);
  const [editingPrize, setEditingPrize] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const loadPrizes = async (
    page = pagination.current,
    pageSize = pagination.pageSize
  ) => {
    setIsLoading(true);
    try {
      const data = await fetchAttempts(page, pageSize);
      const formatted = data.data.map((prize, index) => ({
        key: prize.id.toString(),
        id: `${(page - 1) * pageSize + index + 1}`,
        name: prize.name,
        count: prize.count || 1,
      }));
      setPrizeData(formatted);
      setPagination({
        ...pagination,
        current: data.current_page || page,
        pageSize: data.per_page || pageSize,
        total: data.total || 0,
      });
    } catch (error) {
      message.error("Ошибка при получении списка призов");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      if (editingPrize) {
        await updateAttempt(editingPrize.key, values.prizeName);
        message.success("Приз успешно обновлен");
      } else {
        await addAttempt(values.prizeName);
        message.success("Приз успешно добавлен");
      }
      setShowModal(false);
      setEditingPrize(null);
      loadPrizes();
    } catch (error) {
      console.error("Ошибка при добавлении:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleTableChange = (pagination) => {
    loadPrizes(pagination.current, pagination.pageSize);
  };
  const handleEditClick = (record) => {
    setEditingPrize(record);
    setShowModal(true);
    console.log(record);
  };

  const showDeleteConfirm = (id) => {
    setCurrentDeleteId(id);
    setDeleteConfirmVisible(true);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteAttempt(currentDeleteId);
      message.success("Приз успешно удален");
      loadPrizes();
    } catch (error) {
      message.error("Ошибка при удалении приза");
      console.error(error);
    } finally {
      setIsLoading(false);
      setDeleteConfirmVisible(false);
    }
  };

  useEffect(() => {
    loadPrizes();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Действие",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record.key)}
            title="Удалить"
          />
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
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <h2>Попытки</h2>
        <Button
          type="primary"
          className={styles.addButton}
          onClick={() => setShowModal(true)}
        >
          Создать попытку
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={prizeData}
        className={styles.table}
        scroll={{ x: true }}
        bordered
        loading={isLoading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          showTotal: (total) => `Всего ${total} записей`,
        }}
        onChange={handleTableChange}
      />

      <AddPrizeModal
        visible={showModal}
        handleCancel={() => {
          setShowModal(false);
          setEditingPrize(null);
        }}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        title={editingPrize ? "Редактирование попытки" : "Создание попытки"}
        initialValue={editingPrize?.name}
      />

      <Modal
        title="Подтверждение удаления"
        visible={deleteConfirmVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteConfirmVisible(false)}
        okText="Удалить"
        cancelText="Отмена"
        confirmLoading={isLoading}
      >
        <p>Вы уверены, что хотите удалить этот приз?</p>
      </Modal>
    </div>
  );
}

export default Attempts;
