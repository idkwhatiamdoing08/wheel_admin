import React, { useEffect, useState } from "react";
import { Table, Button, Space, message, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styles from "./EmptyPrizes.module.css";
import AddPrizeModal from "../AddPrizeModal";
import {
  fetchEmptyPrizes,
  addEmptyPrize,
  deleteEmptyPrize,
  updateEmptyPrize,
} from "./EmptyPrizesService";

function EmptyPrizes() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prizeData, setPrizeData] = useState([]);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);
  const [editingPrize, setEditingPrize] = useState(null);

  const loadPrizes = async () => {
    setIsLoading(true);
    try {
      const data = await fetchEmptyPrizes();
      const formatted = data.data.map((prize, index) => ({
        key: prize.id.toString(),
        id: `00${index + 1}`,
        name: prize.name,
        count: prize.count || 1,
      }));
      setPrizeData(formatted);
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
        await updateEmptyPrize(editingPrize.key, values.prizeName);
        message.success("Приз успешно обновлен");
      } else {
        await addEmptyPrize(values.prizeName);
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
      await deleteEmptyPrize(currentDeleteId);
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
      title: "Количество",
      dataIndex: "count",
      key: "count",
      width: 180,
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
        <h2>Пустые призы</h2>
        <Button
          type="primary"
          className={styles.addButton}
          onClick={() => setShowModal(true)}
        >
          Создать новый приз
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={prizeData}
        className={styles.table}
        pagination={false}
        scroll={{ x: true }}
        bordered
        loading={isLoading}
      />

      <AddPrizeModal
        visible={showModal}
        handleCancel={() => {
          setShowModal(false);
          setEditingPrize(null);
        }}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        title={editingPrize ? "Редактирование приза" : "Создание пустого приза"}
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

export default EmptyPrizes;
