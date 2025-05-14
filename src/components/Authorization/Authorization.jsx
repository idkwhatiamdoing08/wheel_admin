import React, { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./Authorization.module.css";
import { login } from "./authService";

function Authorization() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await login(values);
      api.success({
        message: "Авторизация успешна!",
        description: "Вы будете перенаправлены на главную страницу...",
        placement: "topRight",
        duration: 2,
      });
      setTimeout(() => navigate("/wheels"), 3000);
    } catch (e) {
      api.error({
        message: "Ошибка авторизации" + e,
        description: "Проверьте логин или пароль.",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        className={styles.auth_form}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Введите username" }]}
        >
          <Input
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Введите пароль!" }]}
        >
          <Input.Password
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Authorization;
