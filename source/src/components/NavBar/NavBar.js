import Link from "next/link";
import styles from "./NavBar.module.scss";

function NavBar() {
  return (
    <ul className={styles.navbar}>
      <li className={styles.navBarLi}><Link className={styles.linkItem} href={'/home'}>Início</Link></li>
      <li className={styles.navBarLi}><Link className={styles.linkItem} href={'/pj'}>Pessoa Jurídica</Link></li>
      <li className={styles.navBarLi}><Link className={styles.linkItem} href={'/pf'}>Pessoa Física</Link></li>
      <li className={styles.navBarLi}><Link className={styles.linkItem} href={'/fii'}>Fundos Imobiliários</Link></li>
      <li>
        <a className={styles.userIcon} href="#"><img src="/user_icon.png" alt="user_icon"/></a>
        <div className={styles.dropdownContent}>
          <div className={styles.dropdownSub}>
            <ul>
              <li><Link href={'#'}>Meus Lances</Link></li>
              <li><Link href={'/myContracts'}>Meus Contratos</Link></li>
              <li><Link href={'#'}>Minha conta</Link></li>
              <li><Link href={'/'}>Sair</Link></li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default NavBar;
