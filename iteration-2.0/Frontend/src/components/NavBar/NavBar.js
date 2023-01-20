import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { BiUserCircle } from "react-icons/bi";

import styles from "./NavBar.module.scss";
import { getUserData } from "../../functions/getUserData";
import { useEffect, useState } from "react";

async function onLoadHandler(setUserData) {
  const data = await getUserData();
  setUserData(data);
}

function NavBar() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (session) {
      // onLoadHandler(setUserData);
    }
  }, []);

  function saveDataHandler() {
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log(userData)
  }

  function signInHandler() {
    signIn("google");
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
              <button className={styles.googleBtn} onClick={signInHandler}>
                Acesse com <FcGoogle />
              </button>
            </li>
          )}
          {session && (
            <li className={styles.userIconContainer}>
              <button
                onClick={saveDataHandler}
                className={styles.userIcon}
                href="#"
              >
                {session.user.image ? (
                  <img src={`${session.user.image}`} alt="user_icon" />
                ) : (
                  <BiUserCircle />
                )}
              </button>
              <div className={styles.dropdownContent}>
                <div className={styles.dropdownSub}>
                  <ul>
                    <li>
                      <Link href={"/myBids"}>Meus Lances</Link>
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
