import { format, parseISO } from "date-fns";
import { useEffect } from "react";
import ptBR from "date-fns/locale/pt-BR";
import Image from "next/image";
import styles from "./SaleModal.module.scss";

function SaleModal(props) {
  // const formatedStartDate = format(parseISO(props.startDate), "MMMM", {
  //   locale: ptBR,
  // });
  // const formatedMonthEndDate = format(parseISO(props.endDate), "MMMM", {
  //   locale: ptBR,
  // });
  // const formatedYearEndDate = format(parseISO(props.endDate), "yyyy", {
  //   locale: ptBR,
  // });

  return (
    <div className={styles.cardContainer}>
      <div className={styles.header}>
        <h3>Realizar novo Leilão</h3>
        <button
          style={{ all: "unset", cursor: "pointer" }}
          onClick={() => {
            props.setShowModal(false);
          }}
        >
          X
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.firstColumn}>
          <img
            src={`/${props.image}`}
            width={256}
            height={256}
            alt="build-image"
          />
          <div className={styles.infosBx}>
            <h3>{props.address}</h3>
            <p>
              {props.district}, {props.state}
            </p>
            {/* <p>
              <span>{formatedStartDate}</span> a{" "}
              <span>{formatedMonthEndDate}</span> de {formatedYearEndDate}
            </p> */}
          </div>
        </div>
        <div className={styles.secondColumn}>
          <div className={styles.calendar}>
            <p>Selecione as datas</p>
            <div>exemplo</div>
          </div>
          <div className={styles.salesBx}>
            <p>Novo valor minímo</p>
            <input placeholder="Digite o valor" type="number" />
            <button type="button">Enviar leilão</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaleModal;
