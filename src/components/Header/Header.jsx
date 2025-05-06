import styles from './Header.module.css'
import { Link } from 'react-router-dom';

function Header() {
  

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="/logo.svg" alt="Логотип человека" />
        <div className={styles.header__text}>Админ панель</div>
      </div>
    </div>
    
  );
}

export default Header;