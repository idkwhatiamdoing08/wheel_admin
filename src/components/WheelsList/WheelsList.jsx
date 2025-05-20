import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, Space, message, Tag } from "antd";
import data from "./data.json";
import WheelEditForm from "../WheelEditForm/WheelEditForm";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import styles from "./WheelsList.module.css";
import WheelAddForm from "../WheelAddForm/WheelAddForm";
import { fetchWheels, deleteWheel } from "./WheelsListService";

function WheelsList() {
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wheelsData, setWheelsData] = useState([]);
  const [selectedWheel, setSelectedWheel] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const loadWheels = async (
    page = pagination.current,
    pageSize = pagination.pageSize
  ) => {
    setIsLoading(true);
    try {
      const data = await fetchWheels(page, pageSize);
      const formatted = data.data.map((wheel, index) => ({
        key: wheel.id.toString(),
        id: `${(page - 1) * pageSize + index + 1}`,
        name: wheel.name,
        activityPeriod: `${wheel.date_start} - ${wheel.date_end}`,
        status: wheel.status,
        count_sectors: wheel.count_sectors,
        date_start: wheel.date_start,
        date_end: wheel.date_end,
        sectors: wheel.sectors,
        days_of_week: wheel.days_of_week,
      }));
      setWheelsData(formatted);
      setPagination({
        current: data.current_page,
        pageSize: data.per_page,
        total: data.total,
      });
    } catch (error) {
      message.error("Ошибка при загрузке колес");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadWheels();
  }, []);

  const handleDelete = async (record) => {
    try {
      await deleteWheel(record.key);
      message.success(`Колесо с ID ${record.id} удалено`);
      loadWheels();
    } catch (error) {
      alert("Ошибка при удалении колеса");
      console.error(error);
    }
  };
  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
    loadWheels(newPagination.current, newPagination.pageSize);
  };

  const isActive = (record) => {
    return record.status === "Активно";
  };

  const isArchived = (record) => {
    return record.status === "В архиве";
  };

  const renderStatus = (status) => {
    let icon, color, text;

    switch (status) {
      case "Активно":
        icon = <CheckCircleOutlined />;
        color = "green";
        text = "Активно";
        break;
      case "Не активно":
        icon = <CloseCircleOutlined />;
        color = "orange";
        text = "Не активно";
        break;
      case "В архиве":
        icon = <ClockCircleOutlined />;
        color = "grey";
        text = "В архиве";
        break;
      default:
        icon = <ExclamationCircleOutlined />;
        color = "gray";
        text = "Неизвестно";
    }

    return (
      <Tag icon={icon} color={color}>
        {text}
      </Tag>
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Название акции",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Период активности",
      dataIndex: "activityPeriod",
      key: "activityPeriod",
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (status) => renderStatus(status),
    },
    {
      title: "Действия",
      key: "Действия",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          {!isArchived(record) && (
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                setShowEdit(true);
                setSelectedWheel(record);
                console.log(selectedWheel);
              }}
            />
          )}

          {!isActive(record) && (
            <Popconfirm
              title="Вы уверены, что хотите удалить эту запись?"
              onConfirm={() => handleDelete(record)}
              okText="Да"
              cancelText="Нет"
            >
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <h2>Список акционных колес</h2>
        <Button
          type="primary"
          className={styles.add_button}
          onClick={() => setShowModal(true)}
        >
          Добавить новое колесо
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={wheelsData}
        className={styles.table}
        scroll={{ x: true }}
        rowKey="id"
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          showTotal: (total) => `Всего ${total} записей`,
        }}
        onChange={handleTableChange}
      />
      <WheelAddForm
        open={showModal}
        onCancel={() => setShowModal(false)}
        onSuccess={loadWheels}
      />
      <WheelEditForm
        open={showEdit}
        onCancel={() => setShowEdit(false)}
        initialData={selectedWheel}
        onSuccess={loadWheels}
      />
    </div>
  );
}

export default WheelsList;
