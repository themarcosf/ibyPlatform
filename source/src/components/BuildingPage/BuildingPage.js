import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import Image from "next/image";
import { useEffect, useState } from "react";

import Card from "../Card/Card";

import styles from "./BuildingPage.module.scss";

function BuildingPage(props) {
  const [buildingStatus, setbuildingStatus] = useState("Pronto para morar!");

  const auctionEndDate = new Date(props.auctionEndDate).toLocaleDateString(
    "pt-BR",
    { year: "numeric", month: "long", day: "numeric" }
  );
  
  const leaseBeginDate = new Date(props.leaseBeginDate).toLocaleDateString(
    "pt-BR",
    { year: "numeric", month: "long", day: "numeric" }
  );

  useEffect(() => {
    if (props.inConstruction == true) {
      setbuildingStatus("Em construção");
    } else if (props.toRetrofit == true) {
      setbuildingStatus("Para reforma");
    }
  }, []);

  const brlMinValue = props.minValue.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  const brlLastBidValue = props?.lastBidValue?.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className={styles.buildingPageContent}>
      <h1>{`${props.streetAddress} - ${props.neighborhood}, ${props.state}`}</h1>
      <div className={styles.statusAndFavorite}>
        <p>Status: {buildingStatus} </p>
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
            <p className={styles.minimumValue}>Valor mínimo: {brlMinValue}</p>
            <p className={styles.currentValue}>
              Valor Atual: {brlLastBidValue ? brlLastBidValue : brlMinValue}
            </p>
            <p className={styles.period}>Início em {leaseBeginDate}</p>
            <p className={styles.period}>Período de 10 anos</p>
            <p className={props.auctionEndDate > Date.now() ? styles.period : styles.red}>
              {props.auctionEndDate > Date.now()
                ? `Esse leilão se encerra dia ${auctionEndDate}`
                : `Esse leilão se encerrou no dia ${auctionEndDate}`}
            </p>
          </div>
          <div className={styles.moneyContainer}>
            <input placeholder="Digite o valor" type="number" />
            <button type="button">Fazer meu lance</button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default BuildingPage;
