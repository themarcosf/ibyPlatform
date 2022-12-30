import { getSession, useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { verifyUser } from "../functions/verifyUser";

import styles from "../styles/myAccount.module.scss";

function myAccount({ session, userData }) {
  const { status } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  function deleteHandler() {
    console.log(userData);

    // Sign out and redirect to '/'
  }

  function submitHandler(event) {
    event.preventDefault();

    setIsEditing(false);

    console.log("patch");

    // PATCH com as novas informações
  }

  function editingHandler() {
    setIsEditing((prevState) => {
      return !prevState;
    });
  }

  function logoutHandler() {
    signOut();
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.menu}>
          <h1>
            Minha conta
          </h1>
          <ul>
            <li>
              <button
                style={isEditing ? { cursor: "not-allowed" } : null}
                disabled={isEditing}
                onClick={editingHandler}
              >
                Editar dados
              </button>
            </li>
            <li>
              <button onClick={deleteHandler}>Excluir conta</button>
            </li>
            <li>
              <button onClick={logoutHandler}>Sair</button>
            </li>
          </ul>
        </div>
        {status == "authenticated" && (
          <div className={styles.profile}>
            <div className={styles.imageBx}>
              <img src="/user_icon.png" />
            </div>
            <form onSubmit={submitHandler} className={styles.form}>
              <div className={styles.columns}>
                <div className={styles.column}>
                  <div className={styles.field}>
                    <label>Nome</label>
                    <input
                      placeholder={userData.username}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className={styles.field}>
                    <label>CPF/CNPJ</label>
                    <input disabled={!isEditing} placeholder={userData.nationalId}/>
                  </div>
                </div>
                <div className={styles.column}>
                  <div className={styles.field}>
                    <div className={styles.walletBx}>
                      <label>Carteira</label>
                      <AiOutlineQuestionCircle fill="#1351b4" />
                    </div>
                    <input disabled={!isEditing} placeholder={userData.wallet}/>
                  </div>
                  <div className={styles.field}>
                    <div className={styles.walletBx}>
                      <label>Meio de Pagamento</label>
                    </div>
                    <select disabled={!isEditing}>
                      <option>Cartão de Crédito</option>
                      <option>Pix</option>
                      <option>Boleto</option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                style={!isEditing ? { cursor: "not-allowed" } : null}
                disabled={!isEditing}
                type="submit"
              >
                Salvar informações
              </button>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  let userData

  if (session) {
    userData = await verifyUser(session.user.email, session.user.name);
  }

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session: session, userData: userData },
  };
}

export default myAccount;
