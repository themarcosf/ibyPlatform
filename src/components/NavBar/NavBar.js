import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

import { getUserData } from "../../functions/getUserData";

import styles from "./NavBar.module.scss";

async function onLoadHandler(setUserData) {
  const data = await getUserData();
  setUserData(data);
}

function NavBar() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      onLoadHandler(setUserData);
    }
  }, [session]);

  function saveDataHandler() {
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  function signInHandler() {
    signIn("google");
  }

  function logoutHandler() {
    signOut();
    router.push("/");
  }

  if (!session || userData) {
    return (
      <>
        <nav className={`${styles.nav} ${styles.stroke}`}>
          <ul>
            <div>
              <li className={router.pathname == "/" ? styles.active : ""}>
                <Link href={"/"}>Início</Link>
              </li>
              <li className={router.pathname == "/toRent" ? styles.active : ""}>
                <Link href={"/toRent"}>Imóveis para alugar</Link>
              </li>
              <li
                className={router.pathname == "/toOwners" ? styles.active : ""}
              >
                <Link href={"/toOwners"}>Para proprietários</Link>
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
                  <img
                    src={`${session.user.image}`}
                    alt="user_icon"
                    referrerPolicy="no-referrer"
                  />
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
  } else {
    return <p>Carregando</p>;
  }
}

export default NavBar;
