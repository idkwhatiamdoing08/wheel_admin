import React, { useState } from "react";
import { Checkbox, DatePicker, Modal } from "antd";
import styles from "./WheelAddForm.module.css";
import { createWheel } from "../WheelsList/WheelsListService";

function WheelAddForm({ open, onCancel, onSuccess }) {
  const [wheelData, setWheelData] = useState({
    name: "",
    count_sectors: "",
    animation: false,
    date_start: "",
    date_end: "",
    days_of_week: ["Суббота", "Воскресенье"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createWheel(wheelData);

      onCancel();
      onSuccess();
    } catch (e) {
      console.error("Ошибка добавления колеса", e);
    }
  };

  const handleDateChange = (dates, dateStrings) => {
    if (dates && dates.length === 2) {
      setWheelData({
        ...wheelData,
        date_start: dateStrings[0],
        date_end: dateStrings[1],
      });
    }
  };

  const handleCheckboxChange = (day) => {
    setWheelData((prev) => {
      const newDays = prev.days_of_week.includes(day)
        ? prev.days_of_week.filter((d) => d !== day)
        : [...prev.days_of_week, day];
      return { ...prev, days_of_week: newDays };
    });
  };

  return (
    <Modal
      className={styles.form__modal}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <div className={styles.form__wrapper}>
        <h2 className={styles.form__header}>Форма создания колеса</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.form__field}>
            <label className={styles.form__label}>Название колеса:</label>
            <input
              type="text"
              placeholder="Введите название колеса"
              className={styles.form__input}
              value={wheelData.name}
              onChange={(e) =>
                setWheelData({ ...wheelData, name: e.target.value })
              }
            />
          </div>

          <div className={styles.form__body}>
            <div className={styles.form_left}>
              <div className={styles.form__field}>
                <label className={styles.form__label}>
                  Введите период работы:
                </label>
                <div className={styles.form__dates}>
                  <DatePicker.RangePicker
                    onChange={handleDateChange}
                    className={styles.date_picker}
                    placeholder={["Начало", "Конец"]}
                  />
                </div>
              </div>

              <div className={styles.form__field}>
                <label className={styles.form__label}>
                  Введите количество секторов:
                </label>
                <input
                  type="number"
                  placeholder="Кол-во секторов"
                  className={styles.form__input}
                  value={wheelData.count_sectors}
                  onChange={(e) =>
                    setWheelData({
                      ...wheelData,
                      count_sectors: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className={styles.form_right}>
              <label className={styles.form__label}>
                Введите дни доступности:
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
                    className={styles.checkbox}
                    checked={wheelData.days_of_week.includes(day)}
                    onChange={() => handleCheckboxChange(day)}
                  >
                    {day}
                  </Checkbox>
                ))}
              </div>
            </div>
          </div>

          <button className={styles.form__button}>Сохранить</button>
        </form>
      </div>
    </Modal>
  );
}

export default WheelAddForm;
