import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import Image from "next/image";

import Card from "../Card/Card";

import styles from "./BuildingPage.module.scss";

function BuildingPage(props) {
  const price = props.price;
  const brlPrice = price.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className={styles.buildingPageContent}>
      <h1>{`${props.street} - ${props.district}, ${props.state}`}</h1>
      <div className={styles.statusAndFavorite}>
        <p>
          Status: {props.isBuilding ? "Em construção." : "Pronto para morar."}
        </p>
        <span>
          Salvar <img src="/favorite.png" />
        </span>
      </div>
      <div className={styles.imgsContainer}>
        <div>
          <Image
            className={styles.firstImg}
            src={`${props.image[0]}`}
            width={500}
            height={330}
          />
        </div>
        <div>
          <Image
            className={styles.secondImg}
            src={`${props.image[1]}`}
            width={500}
            height={330}
          />
        </div>
        <div>
          <Image
            className={styles.thirdImg}
            src={`${props.image[2]}`}
            width={500}
            height={330}
          />
        </div>
      </div>
      <div className={styles.descriptionAndCard}>
        <div className={styles.descriptionContainer}>
          <h3>Descrição</h3>
          <p>{props.description}</p>
        </div>
        <Card>
          <div className={styles.infoContainer}>
            <p className={styles.minimumValue}>Valor mínimo: {brlPrice}</p>
            <p className={styles.currentValue}>
              Valor Atual: <i>Ultimo lance</i>
            </p>
            <p className={styles.period}>
              Período: {props.startDate}, {props.endDate}
            </p>
          </div>
          <div className={styles.moneyContainer}>
            <input placeholder="Digite o valor" r type="number" />
            <button type="button">Fazer meu lance</button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default BuildingPage;
