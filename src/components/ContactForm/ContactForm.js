import { useRef, useState } from "react";
import Input from "react-phone-number-input/input";
import toast, { Toaster } from "react-hot-toast";
import cookieCutter from 'cookie-cutter'

import styles from "./ContactForm.module.scss";

function ContactForm(props) {
  const [value, setValue] = useState();
  const nameInputRef = useRef();
  const nationalIdInputRef = useRef();
  const mobileInputRef = useRef();
  const walletInputRef = useRef();
  const jwtCookie = cookieCutter.get('jwt')


  function contactSubmitHandler(event) {
    event.preventDefault();

    const contactData = {
      name: nameInputRef.current.value,
      nationalId: Number(nationalIdInputRef.current.value),
      mobile: Number(
        mobileInputRef.current.value.replace(/[^0-9.-]+/g, "").replace(/-/g, "")
      ),
      wallet: walletInputRef.current.value,
    };

    if (
      contactData.name &&
      contactData.nationalId &&
      contactData.mobile &&
      contactData.wallet
    ) {
      fetch(`${process.env.BASEURL}/user/currentUser`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${jwtCookie}`,
        },
        body: JSON.stringify(contactData),
      })
        .then((response) => response.json())
        .then(() => {
          props.showBtnHandler(false);
          props.nextButton();
        });
    } else {
      toast.error("Preencha todos os campos", {
        position: "bottom-right",
      });
    }
  }

  return (
    <div className={styles.content}>
      <h1>
        Informações para <br /> contato
      </h1>
      <form id="form" onSubmit={contactSubmitHandler}>
        <div className={styles.field}>
          <label>Nome completo</label>
          <input
            type="text"
            placeholder={props.userData.username}
            ref={nameInputRef}
          />
        </div>
        <div className={styles.field}>
          <label>CPF/CNPJ</label>
          <input
            type="number"
            placeholder={
              props.userData.nationalId
                ? props.userData.nationalId
                : "_ _ _ _ _ _ _ _ _-_ _"
            }
            ref={nationalIdInputRef}
          />
        </div>
        <div className={styles.field}>
          <label>Telefone</label>
          <Input
            country="BR"
            placeholder={
              props.userData.mobile
                ? props.userData.mobile
                : "Insira seu telefone"
            }
            value={value}
            onChange={setValue}
            ref={mobileInputRef}
          />
        </div>
        <div className={styles.field}>
          <label>Carteira</label>
          <input
            type="text"
            placeholder={
              props.userData.wallet
                ? props.userData.wallet
                : "Insira sua carteira"
            }
            ref={walletInputRef}
          />
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default ContactForm;
