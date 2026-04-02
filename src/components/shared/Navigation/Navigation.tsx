import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from './navConfig'
import styles from './Navigation.module.css'

export function Navigation() {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <div className={styles.brand}>
        <span className={styles.brandIcon} aria-hidden="true">
          🐲
        </span>
        <span className={styles.brandName}>PalHelper</span>
      </div>
      <ul className={styles.list} role="list">
        {NAV_ITEMS.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.linkIcon} aria-hidden="true">
                {item.icon}
              </span>
              <span className={styles.linkLabel}>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
