import Link from "next/link";
import styles from "./NavBar.module.scss";

function NavBar() {
  return (
    <ul className={styles.navbar}>
      <li><Link className={styles.linkItem} href={'/pessoa-fisica'}>Pessoa Física</Link></li>
      <li><Link className={styles.linkItem} href={'/pessoa-juridica'}>Pessoa Jurídica</Link></li>
      <li><Link className={styles.linkItem} href={'/fundos'}>Fundos</Link></li>
      <li><Link className={styles.linkItem} href={'/sobre'}>Sobre</Link></li>
      <li>
        <img src="/user_icon.png" alt="user_icon"/>
      </li>
    </ul>
  );
}

export default NavBar;
