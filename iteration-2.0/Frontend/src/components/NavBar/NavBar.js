import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { BsGoogle } from "react-icons/bs";

import styles from "./NavBar.module.scss";

function NavBar() {
  const { data: session } = useSession();

  function logoutHandler() {
    signOut();
  }

  return (
    <ul className={styles.navbar}>
      { !session && <li>
        <Link className={styles.linkItem} href={"/home"}>
          Início
        </Link>
      </li>}
      <li>
        <Link className={styles.linkItem} href={"/pj"}>
          Pessoa Jurídica
        </Link>
      </li>
      <li>
        <Link className={styles.linkItem} href={"/pf"}>
          Pessoa Física
        </Link>
      </li>
      <li>
        <Link className={styles.linkItem} href={"/fii"}>
          Fundos Imobiliários
        </Link>
      </li>
      {!session && (
        <li>
          <a onClick={() => signIn("google")}>  
            Acesse com <BsGoogle />
          </a>
        </li>
      )}
      {session && (
        <li>
          <a className={styles.userIcon} href="#">
            <img src='/user_icon.png' alt="user_icon" />
          </a>
          <div className={styles.dropdownContent}>
            <div className={styles.dropdownSub}>
              <ul>
                <li>
                  <Link href={"#"}>Meus Lances</Link>
                </li>
                <li>
                  <Link href={"/myContracts"}>Meus Contratos</Link>
                </li>
                <li>
                  <Link href={"/myAccount"}>Minha conta</Link>
                </li>
                <li>
                  <a onClick={logoutHandler}>Sair</a>
                </li>
              </ul>
            </div>
          </div>
        </li>
      )}
    </ul>
  );
}

export default NavBar;
