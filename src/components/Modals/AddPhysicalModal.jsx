import React, { useEffect } from "react";
import { Button, Form, Input, Modal, InputNumber } from "antd";

function AddPhysicalModal({
  visible,
  handleCancel,
  onSubmit,
  isLoading,
  title,
  initialValue,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        prizeName: initialValue.name || "",
        prizeCount: initialValue.count || "",
      });
    }
  }, [visible, initialValue, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Ошибка валидации:", info);
      });
  };

  return (
    <Modal title={title} open={visible} onCancel={handleCancel} footer={null}>
      <Form form={form} layout="vertical" name="addPrizeForm">
        <Form.Item
          name="prizeName"
          label="Наименование приза"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите наименование приза",
            },
            {
              max: 100,
              message: "Наименование не должно превышать 100 символов",
            },
          ]}
        >
          <Input placeholder="Введите наименование приза" />
        </Form.Item>
        <Form.Item
          name="prizeCount"
          label="Количество призов"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите количество призов",
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="Введите количество призов"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={isLoading}
            block
          >
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddPhysicalModal;
