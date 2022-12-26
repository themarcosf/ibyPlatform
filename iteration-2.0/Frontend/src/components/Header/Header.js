import Image from "next/image";

import NavBar from "../NavBar/NavBar";

import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.headerContainer}>
      <img
        src="/iby_logo.svg"
        width={220}
        height={130}
        alt="iby_logo"
      />
      <NavBar />
    </header>
  );
}

export default Header;
