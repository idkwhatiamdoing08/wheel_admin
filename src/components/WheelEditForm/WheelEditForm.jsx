import React from 'react';
import { Checkbox, DatePicker, Select, Input, Button, Modal } from 'antd';
import styles from './WheelEditForm.module.css';
import moment from 'moment';
import { useState } from 'react';

const { Option } = Select;

function WheelEditForm({ open, onCancel }) {
   const [sectorCount, setSectorCount] = useState(5);
  const [sectors, setSectors] = useState([
    { id: 1, prize: "Промокод 10%" },
    { id: 2, prize: "Сумка" },
    { id: 3, prize: "Пустой приз" },
    { id: 4, prize: "Пустой приз" },
    { id: 5, prize: "Пустой приз" }
  ]);

  const handleSectorCountChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    setSectorCount(count);
    const newSectors = [];
    for (let i = 1; i <= count; i++) {
      const existingSector = sectors.find(s => s.id === i);
      newSectors.push({
        id: i,
        prize: existingSector ? existingSector.prize : "Пустой приз"
      });
    }
    setSectors(newSectors);
  };

  const handlePrizeChange = (id, value) => {
    setSectors(prev => prev.map(sector => 
      sector.id === id ? { ...sector, prize: value } : sector
    ));
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
        <form>
          <div className={styles.form__field}>
            <label className={styles.form__label}>Название колеса:</label>
            <Input 
              value="Тест колесо"
              className={styles.form__input}
            />
          </div>

          <div className={styles.form__body}>
            <div className={styles.form_left}>
              <div className={styles.form__field}>
                <label className={styles.form__label}>Введите период работы:</label>
                <div className={styles.form__dates}>
                  <DatePicker
                    placeholder='Начало' 
                    value={moment('21.04.2025', 'DD.MM.YYYY')}
                    className={styles.date_picker}
                  />
                  <DatePicker 
                    placeholder='Конец'
                    value={moment('20.05.2025', 'DD.MM.YYYY')}
                    className={styles.date_picker}
                  />
                </div>
              </div>

              <div className={styles.form__field}>
                <label className={styles.form__label}>Введите статус:</label>
                <Select className={styles.form__inpute} defaultValue="Активно">
                  <Option value="Активно">Активно</Option>
                  <Option value="Неактивно">Неактивно</Option>
                </Select>
              </div>
            </div>

            <div className={styles.form_right}>
              <div className={styles.form__field}>
                <label className={styles.form__label}>Выберите дни начисления попыток:</label>
                <div className={styles.checkbox_group}>
                  <Checkbox className={styles.checkbox} checked>Понедельник</Checkbox>
                  <Checkbox className={styles.checkbox} checked>Вторник</Checkbox>
                  <Checkbox className={styles.checkbox} checked>Среда</Checkbox>
                  <Checkbox className={styles.checkbox} checked>Четверг</Checkbox>
                  <Checkbox className={styles.checkbox} checked>Пятница</Checkbox>
                  <Checkbox className={styles.checkbox} checked>Суббота</Checkbox>
                  <Checkbox className={styles.checkbox} checked>Воскресенье</Checkbox>
                </div>
              </div>
            </div>
          </div>

           <div className={styles.form__field}>
            <label className={styles.form__label}>Введите количество секторов:</label>
            <Input 
              type="number" 
              value={sectorCount}
              onChange={handleSectorCountChange}
              min={1}
              className={styles.form__input}
            />
          </div>

          <div className={styles.sectors_section}>
            <h3 className={styles.section_title}>Призы по секторам</h3>
            <Button type="dashed" className={styles.add_prize_btn}>
              + Прикрепить приз на сектор
            </Button>

            <div className={styles.sectors_list}>
              {sectors.map(sector => (
                <div key={sector.id} className={styles.sector_item}>
                  <label className={styles.sector_label}>Сектор {sector.id}:</label>
                  <Input 
                    value={sector.prize} 
                    onChange={(e) => handlePrizeChange(sector.id, e.target.value)}
                    className={styles.sector_input} 
                  />
                </div>
              ))}
            </div>
            <div className={styles.probability_section}>
              <label className={styles.form__label}>Добавить вероятность:</label>
              <div className={styles.probability_inputs}>
                <Input 
                  addonAfter="%" 
                  value={25}
                  className={styles.probability_input}
                />
                <Input 
                  placeholder="Количество" 
                  className={styles.quantity_input}
                />
              </div>
            </div>
          </div>

          <button className={styles.form__button}>Сохранить</button>
        </form>
      </div>
    </Modal>
  );
}

export default WheelEditForm;