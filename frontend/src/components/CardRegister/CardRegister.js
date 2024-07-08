import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import styles from "./CardRegister.module.scss";

function CardRegister(props) {
  const [userData, setUserData] = useState();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, []);

  function cardSubmitHandler(event) {
    event.preventDefault();

    props.nextButton();
  }
  if (userData) {
    return (
      <div className={styles.content}>
        <h1>
          Adicionar um novo <br /> cartão de {props.cardType}
        </h1>
        <form id="form" onSubmit={cardSubmitHandler}>
          <div className={styles.field}>
            <label>Número do cartão</label>
            <input
              type="number"
              placeholder="5403 2017 0608 5434"
              disabled={true}
            />
          </div>
          <div className={styles.field}>
            <label>Nome no cartão</label>
            <input type="text" placeholder={userData.name} disabled={true} />
          </div>
          <div className={styles.fieldsContainer}>
            <div className={styles.expirationDateContainer}>
              <label>Data de expiração</label>

              <div>
                <div className={styles.selectDate}>
                  <input type="number" placeholder="01" disabled={true} />
                </div>
                <div className={styles.selectDate}>
                  <input type="number" placeholder="01" disabled={true} />
                </div>
              </div>
            </div>
            <div className={styles.cvv}>
              <label>(CVV)</label>
              <input type="number" placeholder="123" disabled={true} />
            </div>
          </div>
        </form>
        <div className={styles.warning}>
          <p>ATENÇÃO: nesse ambiente de testes, você não   deve informar dados financeiros. Apenas clique em "Avançar" para continuar.</p>
        </div>
      </div>
    );
  } else {
    return <p>Carregando</p>;
  }
}

export default CardRegister;
