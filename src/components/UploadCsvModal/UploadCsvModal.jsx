import React, { useState } from "react";
import { Modal, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function UploadCsvModal({ visible, onCancel, onUpload, isLoading, promoName }) {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) {
      message.warning("Пожалуйста, выберите CSV файл");
      return;
    }
    onUpload(file);
  };

  const beforeUpload = (file) => {
    const isCSV = file.type === "text/csv" || file.name.endsWith(".csv");
    if (!isCSV) {
      message.error("Можно загружать только CSV файлы");
      return false;
    }
    setFile(file);
    return false; // Не загружать автоматически
  };

  return (
    <Modal
      title={"Загрузка csv файла для промокода: " + promoName}
      open={visible}
      onCancel={onCancel}
      onOk={handleUpload}
      okText="Загрузить"
      confirmLoading={isLoading}
    >
      <Upload
        beforeUpload={beforeUpload}
        maxCount={1}
        showUploadList={{ showRemoveIcon: true }}
      >
        <Button icon={<UploadOutlined />}>Выбрать файл</Button>
      </Upload>
    </Modal>
  );
}

export default UploadCsvModal;
