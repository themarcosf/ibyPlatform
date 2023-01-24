import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

import CardRegister from "../CardRegister/CardRegister";

import styles from "./PaymentMethodForm.module.scss";

function PaymentMethodForm(props) {
  const [cardType, setCardType] = useState("");

  function clickHandler(card) {
    props.showBtnHandler(true);
    props.setShowCard(true);

    setCardType(card)
  }

  if (props.showCard) {
    return <CardRegister cardType={cardType} nextButton={props.nextButton}/>;
  } else {
    return (
      <div className={styles.content}>
        <h1>Selecione o método de <br /> pagamentos</h1>
        <a onClick={() => clickHandler("crédito")} className={styles.methodCard}>
          <p>Cartão de crédito</p>
          <IoIosArrowForward />
        </a>
        <a onClick={() => clickHandler("débito")} className={styles.methodCard}>
          <p>Cartão de débito</p>
          <IoIosArrowForward />
        </a>
        <a onClick={clickHandler} className={styles.methodCard}>
          <p>Débito em conta</p>
          <IoIosArrowForward />
        </a>
        <a onClick={clickHandler} className={styles.methodCard}>
          <p>Financiamento</p>
          <IoIosArrowForward />
        </a>
      </div>
    );
  }
}

export default PaymentMethodForm;
