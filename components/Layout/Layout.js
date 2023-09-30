import React from "react";
import Header from "./Header";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <main className={styles.main}>{children}</main>
    </React.Fragment>
  );
};

export default Layout;
