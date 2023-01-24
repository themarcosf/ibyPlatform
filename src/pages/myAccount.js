import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { getSession, useSession, signOut } from "next-auth/react";
import Input from "react-phone-number-input/input";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

import styles from "../styles/myAccount.module.scss";
import { editUserData } from "../functions/editUserData";
import { deleteUserData } from "../functions/deleteUserData";

function myAccount(session) {
  const [userData, setUserData] = useState();
  const [value, setValue] = useState();
  const { status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const nameInputRef = useRef();
  const mobileInputRef = useRef();
  const walletInputRef = useRef();
  const nationalIdInputRef = useRef();
  const router = useRouter();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, []);

  function deleteHandler() {
    setShowModal(true);
  }

  async function deleteConfirmedHandler() {
    await deleteUserData();
    signOut();
  }

  async function submitHandler(event) {
    event.preventDefault();
    setIsEditing(false);

    const enteredName = nameInputRef.current.value;
    const enteredMobile = mobileInputRef.current.value;
    const enteredWallet = walletInputRef.current.value;
    const enteredNationalId = nationalIdInputRef.current.value;

    const dataEdited = {
      name: enteredName,
      mobile: Number(enteredMobile.replace(/[^0-9.-]+/g, "").replace(/-/g, "")),
      wallet: enteredWallet,
      nationalId: enteredNationalId,
    };

    if (enteredName && enteredMobile && enteredWallet && enteredNationalId) {
      await editUserData(dataEdited);
      router.reload();
    } else {
      toast.error("Preencha todos os campos!", {
        position: "bottom-right",
      });
    }
  }

  function editingHandler() {
    setIsEditing((prevState) => {
      return !prevState;
    });
  }

  function logoutHandler() {
    signOut();
  }

  if (userData) {
    return (
      <>
        {showModal && (
          <div className={styles.deleteContainer}>
            <p>
              Deseja realmente <b>DELETAR</b> sua conta?
            </p>
            <div>
              <a
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Não
              </a>
              <a onClick={deleteConfirmedHandler}>Sim</a>
            </div>
          </div>
        )}
        <Head>
          <title>Iby Platform | Minha conta</title>
        </Head>
        <Header />
        <main className={styles.main}>
          <div className={styles.menu}>
            <h1>Minha conta</h1>
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
                <img src={`${userData.avatar}`} referrerPolicy="no-referrer" />
              </div>
              <form onSubmit={submitHandler} className={styles.form}>
                <div className={styles.columns}>
                  <div className={styles.column}>
                    <div className={styles.field}>
                      <label>Nome</label>
                      <input
                        tabIndex={1}
                        placeholder={userData.name}
                        disabled={!isEditing}
                        ref={nameInputRef}
                      />
                    </div>
                    <div className={styles.field}>
                      <label>CPF/CNPJ</label>
                      <input
                        tabIndex={3}
                        disabled={!isEditing}
                        placeholder={userData?.nationalId}
                        ref={nationalIdInputRef}
                      />
                    </div>
                    <div className={styles.field}>
                      <div className={styles.walletBx}>
                        <label>Meio de Pagamento</label>
                      </div>
                      <select disabled={!isEditing} tabIndex={5}>
                        <option>Cartão de Crédito</option>
                        <option>Pix</option>
                        <option>Boleto</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.column}>
                    <div className={styles.field}>
                      <div className={styles.walletBx}>
                        <label>Carteira</label>
                        <AiOutlineQuestionCircle fill="#1351b4" />
                      </div>
                      <input
                        tabIndex={2}
                        disabled={!isEditing}
                        placeholder={userData?.wallet}
                        ref={walletInputRef}
                      />
                    </div>
                    <div className={styles.field}>
                      <label>Telefone</label>
                      <Input
                        tabIndex={4}
                        disabled={!isEditing}
                        country="BR"
                        placeholder={
                          userData.mobile
                            ? userData.mobile
                            : "Insira seu telefone"
                        }
                        value={value}
                        onChange={setValue}
                        ref={mobileInputRef}
                      />
                    </div>
                  </div>
                </div>
                <button
                  style={!isEditing ? { cursor: "not-allowed" } : null}
                  disabled={!isEditing}
                  type="submit"
                  tabIndex={6}
                >
                  Salvar informações
                </button>
                <Toaster />
              </form>
            </div>
          )}
        </main>
        <Footer />
      </>
    );
  } else {
    return <p>Carregando</p>;
  }
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: session,
  };
}

export default myAccount;
