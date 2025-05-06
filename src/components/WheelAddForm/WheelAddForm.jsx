import React from 'react';
import { Checkbox, DatePicker, Modal } from 'antd';
import styles from './WheelAddForm.module.css';

function WheelAddForm({ open, onCancel }) {
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
        <form>
          <div className={styles.form__field}>
            <label className={styles.form__label}>Название колеса:</label>          
            <input 
              type="text" 
              placeholder='Введите название колеса' 
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
                    className={styles.date_picker}
                  />
                  <DatePicker 
                    placeholder='Конец' 
                    className={styles.date_picker}
                  />
                </div> 
              </div>
              
              <div className={styles.form__field}>
                <label className={styles.form__label}>Введите количество секторов:</label>
                <input 
                  type="number" 
                  placeholder='Кол-во секторов'
                  className={styles.form__input}
                />
              </div>
            </div>
            
            <div className={styles.form_right}>
              <label className={styles.form__label}>Введите дни доступности:</label>
              <div className={styles.checkbox_group}>
                <Checkbox className={styles.checkbox}>Понедельник</Checkbox>
                <Checkbox className={styles.checkbox}>Вторник</Checkbox>
                <Checkbox className={styles.checkbox}>Среда</Checkbox>
                <Checkbox className={styles.checkbox}>Четверг</Checkbox>
                <Checkbox className={styles.checkbox}>Пятница</Checkbox>
                <Checkbox className={styles.checkbox}>Суббота</Checkbox>
                <Checkbox className={styles.checkbox}>Воскресенье</Checkbox>
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