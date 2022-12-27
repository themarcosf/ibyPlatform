import { getSession, useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

import styles from "../styles/myAccount.module.scss";

async function createUser(email, name) {
  const response = await fetch("http://localhost:3333/users", {
    method: "POST",
    body: JSON.stringify({
      username: name,
      email: email,
      wallet: "",
      paymentMethod: "",
      CPF: null,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  } else console.log("user created!");

  return data;
}

function myAccount({ session }) {
  const { status } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  function deleteHandler() {
    console.log("delete");

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
          <h1 onClick={() => createUser(session.user.email, session.user.name)}>
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
                      placeholder={session.user.name}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className={styles.field}>
                    <label>CPF/CNPJ</label>
                    <input disabled={!isEditing} />
                  </div>
                </div>
                <div className={styles.column}>
                  <div className={styles.field}>
                    <div className={styles.walletBx}>
                      <label>Carteira</label>
                      <AiOutlineQuestionCircle fill="#1351b4" />
                    </div>
                    <input disabled={!isEditing} />
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
  const users = await fetch("http://localhost:3333/users").then((json) =>
    json.json()
  );

  let user;

  if (session) {
    user = users.find((user) => user.email == session.user.email);
  }

  if (!user && session) {
    createUser(session.user.email, session.user.name);
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
    props: { session: session, users: users },
  };
}

export default myAccount;
