import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header__left}>
          <img src="/logo.svg" alt="Логотип человека" />
          <div className={styles.header__text}>Админ панель</div>
        </div>

        <div className={styles.header__logout}>
          <button onClick={() => handleLogout()}>Выйти</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
