import React, { useState, useEffect } from "react";
import { Checkbox, DatePicker, Select, Input, Button, Modal } from "antd";
import moment from "moment";
import styles from "./WheelEditForm.module.css";
import { updateWheel } from "../WheelsList/WheelsListService";

const { Option } = Select;

function WheelEditForm({ open, onCancel, initialData, onSuccess }) {
  const [sectorCount, setSectorCount] = useState(5);
  const [sectors, setSectors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    date_start: null,
    date_end: null,
    status: "",
    days_of_week: [],
    count_sectors: 1,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        count_sectors: initialData.count_sectors || 1,
        status: initialData.status || "",
        date_start: initialData.date_start || null,
        date_end: initialData.date_end || null,
        days_of_week: initialData.days_of_week || ["Суббота"],
        animation: true,
      });

      setSectorCount(initialData.count_sectors || 1);
    }
  }, [initialData]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckboxChange = (day) => {
    setFormData((prev) => {
      const updatedDays = prev.days_of_week.includes(day)
        ? prev.days_of_week.filter((d) => d !== day)
        : [...prev.days_of_week, day];
      return { ...prev, days_of_week: updatedDays };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      date_start: formData.date_start || null,
      date_end: formData.date_end || null,
    };

    try {
      await updateWheel(initialData.key, payload);
      console.log("Колесо успешно обновлено");
      onCancel();
      onSuccess();
    } catch (err) {
      console.error("Ошибка при обновлении:", err);
      console.log(formData);
      console.log(payload);
    }
  };

  const handlePrizeChange = (id, value) => {
    setSectors((prev) =>
      prev.map((sector) =>
        sector.id === id ? { ...sector, prize: value } : sector
      )
    );
  };

  return (
    <Modal
      className={styles.form__modal}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={800}
    >
      <div className={styles.form__wrapper}>
        <h2 className={styles.form__header}>Форма редактирования колеса</h2>
        <form onSubmit={handleSubmit}>
          {/* Название */}
          <div className={styles.form__field}>
            <label className={styles.form__label}>Название колеса:</label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={styles.form__input}
            />
          </div>

          {/* Даты и статус */}
          <div className={styles.form__body}>
            <div className={styles.form_left}>
              <div className={styles.form__field}>
                <label className={styles.form__label}>
                  Введите период работы:
                </label>
                <div className={styles.form__dates}>
                  <DatePicker
                    placeholder="Начало"
                    value={
                      formData.date_start
                        ? moment(formData.date_start, "YYYY-MM-DD")
                        : null
                    }
                    onChange={(date) =>
                      handleChange(
                        "date_start",
                        date ? date.format("YYYY-MM-DD") : null
                      )
                    }
                    className={styles.date_picker}
                  />
                  <DatePicker
                    placeholder="Конец"
                    value={
                      formData.date_end
                        ? moment(formData.date_end, "YYYY-MM-DD")
                        : null
                    }
                    onChange={(date) =>
                      handleChange(
                        "date_end",
                        date ? date.format("YYYY-MM-DD") : null
                      )
                    }
                    className={styles.date_picker}
                  />
                </div>
              </div>

              <div className={styles.form__field}>
                <label className={styles.form__label}>Введите статус:</label>
                <Select
                  value={formData.status}
                  onChange={(value) => handleChange("status", value)}
                  className={styles.form__inpute}
                >
                  <Option value="Активно">Активно</Option>
                  <Option value="Не активно">Не активно</Option>
                  <Option value="В архиве">В архиве</Option>
                </Select>
              </div>
            </div>

            {/* Чекбоксы */}
            <div className={styles.form_right}>
              <div className={styles.form__field}>
                <label className={styles.form__label}>
                  Выберите дни начисления попыток:
                </label>
                <div className={styles.checkbox_group}>
                  {[
                    "Понедельник",
                    "Вторник",
                    "Среда",
                    "Четверг",
                    "Пятница",
                    "Суббота",
                    "Воскресенье",
                  ].map((day) => (
                    <Checkbox
                      key={day}
                      checked={formData.days_of_week.includes(day)}
                      onChange={() => handleCheckboxChange(day)}
                    >
                      {day}
                    </Checkbox>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Количество секторов */}
          <div className={styles.form__field}>
            <label className={styles.form__label}>
              Введите количество секторов:
            </label>
            <Input
              type="number"
              value={formData.count_sectors}
              onChange={(e) =>
                handleChange("count_sectors", parseInt(e.target.value) || 1)
              }
              min={1}
              className={styles.form__input}
            />
          </div>

          {/* Призы (заглушка) */}
          <div className={styles.sectors_section}>
            <h3 className={styles.section_title}>Призы по секторам</h3>
            <Button type="dashed" className={styles.add_prize_btn}>
              + Прикрепить приз на сектор
            </Button>
            <div className={styles.sectors_list}>
              {sectors.map((sector) => (
                <div key={sector.id} className={styles.sector_item}>
                  <label className={styles.sector_label}>
                    Сектор {sector.id}:
                  </label>
                  <Input
                    value={sector.prize}
                    onChange={(e) =>
                      handlePrizeChange(sector.id, e.target.value)
                    }
                    className={styles.sector_input}
                  />
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className={styles.form__button}>
            Сохранить
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default WheelEditForm;
