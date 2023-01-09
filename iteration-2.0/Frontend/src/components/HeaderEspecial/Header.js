import Link from "next/link";

import NavBar from "../NavBar/NavBar";

import styles from "./Header.module.scss";

function HeaderEspecial() {
  return (
    <header className={styles.headerContainer}>
      <Link href={"/"}>
        <img src="/iby_logo.svg" width={220} height={130} alt="iby_logo" />
      </Link>
      <NavBar />
    </header>
  );
}

export default HeaderEspecial;
