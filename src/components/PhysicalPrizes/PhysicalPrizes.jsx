import React, { useEffect } from "react";
import { Table, Button, Space, message, Tag, Modal } from "antd";
import { useState } from "react";
import AddPrizeModal from "../AddPrizeModal";
import AddPhysicalModal from "../Modals/AddPhysicalModal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./PhysicalPrizes.module.css";
import {
  fetchPhysicalPrizes,
  addPhysicalPrize,
  deletePhysicalPrize,
  updatePhysicalPrize,
} from "./PhysicalPrizesService";

function PhysicalPrizes() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prizeData, setPrizeData] = useState([]);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);
  const [editingPrize, setEditingPrize] = useState(null);

  const loadPrizes = async () => {
    setIsLoading(true);
    try {
      const data = await fetchPhysicalPrizes();
      const formatted = data.data.map((prize, index) => ({
        key: prize.id.toString(),
        id: `00${index + 1}`,
        name: prize.name,
        count: prize.count,
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
        await updatePhysicalPrize(
          editingPrize.key,
          values.prizeName,
          values.prizeCount
        );
        message.success("Приз успешно обновлен");
      } else {
        await addPhysicalPrize(values.prizeName, values.prizeCount);
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
      await deletePhysicalPrize(currentDeleteId);
      message.success("Приз успешно удален");
      loadPrizes();
    } catch (error) {
      alert(error.response.data.message);
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
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <h2>Вещественные призы</h2>
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

      {/* <AddPrizeModal
        visible={showModal}
        handleCancel={() => {
          setShowModal(false);
          setEditingPrize(null);
        }}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        title={
          editingPrize ? "Редактирование приза" : "Создание вещественного приза"
        }
        initialValue={editingPrize?.name}
      /> */}
      <AddPhysicalModal
        visible={showModal}
        handleCancel={() => {
          setShowModal(false);
          setEditingPrize(null);
        }}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        title={
          editingPrize ? "Редактирование приза" : "Создание вещественного приза"
        }
        initialValue={{ name: editingPrize?.name, count: editingPrize?.count }}
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

export default PhysicalPrizes;
