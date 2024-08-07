import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { getSession, useSession, signOut } from "next-auth/react";
import Input from "react-phone-number-input/input";
import { AiOutlineQuestionCircle, AiOutlineClose } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import InfoModal from "../components/InfoModal/InfoModal";

import styles from "../styles/myAccount.module.scss";
import { editUserData } from "../functions/editUserData";
import { deleteUserData } from "../functions/deleteUserData";
import DeleteModal from "../components/DeleteModal/DeleteModal";

function myAccount(session) {
  const [userData, setUserData] = useState();
  const [value, setValue] = useState();
  const { status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const nameInputRef = useRef();
  const mobileInputRef = useRef();
  const walletInputRef = useRef();
  const nationalIdInputRef = useRef();
  const router = useRouter();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, []);

  function deleteHandler() {
    setShowDeleteModal(true);
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
        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
        >
          <p>
            Deseja realmente <b>DELETAR</b> sua conta?
          </p>
          <div className={styles.buttonContainer}>
            <a
              onClick={() => {
                setShowDeleteModal(false);
              }}
            >
              Não
            </a>
            <a onClick={deleteConfirmedHandler}>Sim</a>
          </div>
          ;
        </DeleteModal>
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
              <form onSubmit={submitHandler} className={styles.form}>
                <div className={styles.container}>
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
                      <div className={styles.walletBx}>
                        <label>Carteira</label>
                        <AiOutlineQuestionCircle
                          onClick={() => {
                            setShowInfoModal(!showInfoModal);
                          }}
                          fill="#1351b4"
                        />
                        {showInfoModal && (
                          <InfoModal>
                            <p>
                              Caso possua sua própria wallet, basta informa-la.
                              Caso não tenha,
                              <br />
                              use uma dessas por enquanto:
                              <br /> <br />
                              0x340d100601D934C0321Ef417167314b66007d4e4 <br />{" "}
                              <br />
                              0x0a54a762A26c2739217Bebc160Fc532561DCcE61 <br />
                              <br />
                              Está no nosso pipeline a criação de uma solução de
                              wallet própria.
                              <br />
                              Com isso, seremos capazes de criar e armazenar
                              carteiras para os clientes.
                            </p>
                            <AiOutlineClose
                              onClick={() => setShowInfoModal(!showInfoModal)}
                            />
                          </InfoModal>
                        )}
                      </div>
                      <input
                        tabIndex={2}
                        disabled={!isEditing}
                        placeholder={userData?.wallet}
                        ref={walletInputRef}
                      />
                    </div>
                  </div>
                  <div className={styles.row}>
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
