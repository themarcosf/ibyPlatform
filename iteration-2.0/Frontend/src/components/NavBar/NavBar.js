import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

import styles from "./NavBar.module.scss";

function NavBar() {
  const { data: session } = useSession();

  function signInHandler(){
    signIn("google")
  }

  function logoutHandler() {
    signOut();
  }

  return (
    <>
      <nav className={`${styles.nav} ${styles.stroke}`}>
        <ul>
          <div>
            {!session && (
              <li>
                <Link href={"/"}>Início</Link>
              </li>
            )}
            <li>
              <Link href={"/pf"}>Imóveis para alugar</Link>
            </li>
            <li>
              <Link href={"/pj"}>Para proprietários</Link>
            </li>
          </div>

          {!session && (
            <li>
              <button
                className={styles.googleBtn}
                onClick={signInHandler}
              >
                Acesse com <FcGoogle />
              </button>
            </li>
          )}
          {session && (
            <li className={styles.userIconContainer}>
              <button className={styles.userIcon} href="#">
                <img src="/user_icon.png" alt="user_icon" />
              </button>
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
      </nav>
    </>
  );
}

export default NavBar;
