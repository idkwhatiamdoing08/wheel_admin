import React from "react";
import { Table, Button, Space, message, Tag, Modal } from "antd";
import { useState, useEffect } from "react";
import AddPrizeModal from "../AddPrizeModal";

import {
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { fetchPromo, addPromo, deletePromo, updatePromo } from "./PromoService";
import UploadCsvModal from "../UploadCsvModal/UploadCsvModal";
import styles from "./Promo.module.css";
import { fetchPromocodeCsv, uploadPromocodeCsv } from "./csvService";

function Promo() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prizeData, setPrizeData] = useState([]);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);
  const [editingPrize, setEditingPrize] = useState(null);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [selectedPromoId, setSelectedPromoId] = useState(null);
  const [promoCount, setPromoCount] = useState(0);
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
      const data = await fetchPromo(page, pageSize);
      const formatted = data.data.map((prize, index) => ({
        key: prize.id.toString(),
        id: `${(page - 1) * pageSize + index + 1}`,
        name: prize.name,
        count: prize.codes_count,
      }));
      console.log(data);
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
  const handleTableChange = (pagination) => {
    loadPrizes(pagination.current, pagination.pageSize);
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      if (editingPrize) {
        await updatePromo(editingPrize.key, values.prizeName);
        message.success("Приз успешно обновлен");
      } else {
        await addPromo(values.prizeName);
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

  const handleUploadClick = (record) => {
    setSelectedPromoId({ id: record.key, name: record.name });
    setUploadModalVisible(true);

    console.log(record);
  };

  const showDeleteConfirm = (id) => {
    setCurrentDeleteId(id);
    setDeleteConfirmVisible(true);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deletePromo(currentDeleteId);
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
  const handleCsvUpload = async (file) => {
    setIsLoading(true);
    try {
      const response = await uploadPromocodeCsv(selectedPromoId.id, file); // заменил id
      console.log(response);
      alert("Файл успешно загружен");
      setUploadModalVisible(false);
    } catch (error) {
      console.error("Ошибка загрузки файла:", error);
      alert(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getCsvUpload = async () => {
    setIsLoading(true);
    try {
      const response = await fetchPromocodeCsv();
      console.log(response);
      message.success("Данные получены");
    } catch (error) {
      console.error("Ошибка:", error);
      message.error("Ошибка при получении данных");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPrizes();
    getCsvUpload();
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

          <Button
            type="text"
            onClick={() => handleUploadClick(record)}
            icon={<FileTextOutlined />}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <h2>Промокоды</h2>
        <Button
          type="primary"
          className={styles.addButton}
          onClick={() => setShowModal(true)}
        >
          Создать промокод
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
        title={editingPrize ? "Редактирование приза" : "Создание промокода"}
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
      <UploadCsvModal
        visible={uploadModalVisible}
        onCancel={() => setUploadModalVisible(false)}
        onUpload={handleCsvUpload}
        isLoading={isLoading}
        promoName={selectedPromoId?.name || "Промокод"}
      />
    </div>
  );
}

export default Promo;
