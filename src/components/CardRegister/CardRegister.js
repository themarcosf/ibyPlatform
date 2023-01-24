import { IoIosArrowDown } from "react-icons/io";

import styles from "./CardRegister.module.scss";

function CardRegister(props) {
  function cardSubmitHandler(event) {
    event.preventDefault();

    props.nextButton();
  }

  return (
    <div className={styles.content}>
      <h1>
        Adicionar um novo <br /> cartão de {props.cardType}
      </h1>
      <form id="form" onSubmit={cardSubmitHandler}>
        <div className={styles.field}>
          <label>Número do cartão</label>
          <input type="number" />
        </div>
        <div className={styles.field}>
          <label>Nome no cartão</label>
          <input type="text" />
        </div>
        <div className={styles.field}>
          <label>Data de expiração</label>
          <div className={styles.expirationDateBx}>
            <div className={styles.selectDate}>
              <IoIosArrowDown />
            </div>
            <div className={styles.selectDate}>
              <IoIosArrowDown />
            </div>
          </div>
        </div>
        <div className={styles.cvv}>
          <label>Código de <br/> segurança (CVV)</label>
          <input type="number" />
        </div>
      </form>
    </div>
  );
}

export default CardRegister;
