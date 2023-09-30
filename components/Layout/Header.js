import React from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <h2>TODO LIST</h2>
      <nav className={styles.navbar}>
        <ul className={styles.list}>
          <li className={pathname === "/today" ? styles.active : styles.item}>
            <Link href={"/today"}>TODAY</Link>
          </li>
          <li
            className={
              pathname === "/today/completed" ? styles.active : styles.item
            }
          >
            <Link href={"/today/completed"}>COMPLETED</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
