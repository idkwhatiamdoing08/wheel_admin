import React, { useState, useEffect } from "react";
import {
  Checkbox,
  DatePicker,
  Select,
  Input,
  Button,
  Modal,
  message,
} from "antd";
import moment from "moment";
import styles from "./WheelEditForm.module.css";
import { updateWheel } from "../WheelsList/WheelsListService";
import Sectors from "../Sectors/Sectors";
import {
  updateSector,
  deleteSector,
  createSector,
  getPrizes,
} from "../Sectors/SectorsService";

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

  const [prizes, setPrizes] = useState([]);
  const [selectedPrize, setSelectedPrize] = useState(null);

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
      setSectors(initialData.sectors || []);
      setSectorCount(initialData.count_sectors || 1);
      fetchPrizes();
    }
  }, [initialData]);

  const fetchPrizes = async () => {
    try {
      const data = await getPrizes();
      setPrizes(data);
    } catch (err) {
      console.error("Ошибка при загрузке призов:", err);
    }
  };

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

  const handleSectorChange = async (id, key, value) => {
    const updatedSectors = sectors.map((sector) =>
      sector.id === id ? { ...sector, [key]: value } : sector
    );
    setSectors(updatedSectors);

    const updatedSector = updatedSectors.find((s) => s.id === id);
    const payload = {
      prize_type: updatedSector.prize_type || "material_thing", // или другой тип по умолчанию
      prize_id: updatedSector.prize?.id || updatedSector.prize_id,
      probability: updatedSector.probability,
      wheel_id: initialData.key,
    };

    try {
      await updateSector(initialData.key, id, payload);
    } catch (error) {
      console.error("Ошибка при обновлении сектора:", error);
    }
  };

  const handleDeleteSector = async (sectorId) => {
    try {
      await deleteSector(sectorId);
      setSectors((prev) => prev.filter((s) => s.id !== sectorId));
    } catch (err) {
      console.error("Ошибка при удалении сектора:", err);
    }
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
    }
  };

  const handleProbabilityChange = (id, value) => {
    handleSectorChange(id, "probability", value);
  };

  const handlePrizeChange = async (id, prizeId) => {
    const prize = prizes.find((p) => p.name === prizeId || p.id === prizeId);
    if (!prize) return;
    setSectors((prev) =>
      prev.map((sector) => (sector.id === id ? { ...sector, prize } : sector))
    );

    try {
      await updateSector(initialData.key, id, { prize_id: prize.id });
    } catch (error) {
      console.error("Ошибка при обновлении приза сектора:", error);
    }
  };

  const handleAddSector = async () => {
    if (!selectedPrize) return;

    try {
      const newSector = await createSector({
        prize_id: selectedPrize,
        probability: 0,
        wheel_id: initialData.key,
        prize_type: "material_thing",
      });
      setSectors((prev) => [...prev, newSector]);
      setSelectedPrize(null);
      message.success("Сектор добавлен");
    } catch (error) {
      console.error("Ошибка при добавлении сектора:", error);
      message.error("Не удалось добавить сектор");
    }
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
          <div className={styles.form__field}>
            <label className={styles.form__label}>Название колеса:</label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={styles.form__input}
            />
          </div>

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
              className={styles.form__input}
            />
          </div>

          <div className={styles.sectors_section}>
            <h3 className={styles.section_title}>Призы по секторам</h3>
            <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
              <Select
                style={{ width: 300 }}
                value={selectedPrize}
                onChange={setSelectedPrize}
                placeholder="Выберите приз"
              >
                {prizes.map((prize) => (
                  <Option key={prize.id} value={prize.id}>
                    {prize.name}
                  </Option>
                ))}
              </Select>
              <Button type="dashed" onClick={handleAddSector}>
                + Прикрепить приз на сектор
              </Button>
            </div>
            <Sectors
              sectors={sectors}
              onPrizeChange={handlePrizeChange}
              onProbabilityChange={handleProbabilityChange}
              onDeleteSector={handleDeleteSector}
            />
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
