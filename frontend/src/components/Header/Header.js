import { useRouter } from "next/router";
import Link from "next/link";

import NavBar from "../NavBar/NavBar";

import styles from "./Header.module.scss";

function Header() {
  const router = useRouter();

  return (
    <header
      className={`${styles.headerContainer} ${
        router.pathname == "/" ? styles.bxShadowNone : ""
      }`}
    >
      <Link className={styles.imgBx} href={"/"}>
        <img src="/iby_logo.png" alt="iby_logo" />
      </Link>
      <NavBar />
    </header>
  );
}

export default Header;
