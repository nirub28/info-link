import React, { useState } from 'react';
import styles from '../styles/header.module.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <header className={styles.header}>
        <img
          className={styles.threeLines}
          src="https://cdn-icons-png.flaticon.com/128/11081/11081623.png"
          alt="icons"
          onClick={toggleMenu}
        />
        <h3><a href='/'>LinkLite</a></h3>
      </header>
      <nav className={menuOpen ? `${styles.slide} ${styles.open}` : styles.slide}>
        <ul>
          <li className={`${styles.litagUser}  ${styles.litag}`}>
            <b><a href="/users/management">User Management</a></b>
          </li>
          <li className={`${styles.litagSettings} ${styles.litag}`}>
            <b><a href="/users/settings">Settings</a></b>
          </li>
          <li className={`${styles.litagReports}  ${styles.litag}`}>
            <b><a href="/users/reports">Reports</a></b>
          </li>
        </ul>
        
      </nav>
      
    </div>
  );
};

export default Header;
