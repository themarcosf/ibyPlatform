import styles from "./NavBar.module.scss";

function NavBar() {
  return (
    <ul className={styles.navbar}>
      <li>Pessoa Física</li>
      <li>Pessoa Jurídica</li>
      <li>Fundos</li>
      <li>Sobre</li>
      <li>
        <img src="/user_icon.png" alt="user_icon"/>
      </li>
    </ul>
  );
}

export default NavBar;
