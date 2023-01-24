import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import Image from "next/image";

import styles from "./BoughtBuildingCard.module.scss";

function BoughtBuildingCard(props) {
  const formatedStartDate = format(parseISO(props.leaseBeginDate), "MMMM", {
    locale: ptBR,
  });
  const formatedMonthEndDate = format(parseISO(props.leaseEndDate), "MMMM", {
    locale: ptBR,
  });
  const formatedYearEndDate = format(parseISO(props.leaseEndDate), "yyyy", {
    locale: ptBR,
  });

  return (
    <button
      style={{ all: "unset", cursor: "pointer" }}
      onClick={() => {
        props.setShowModal(true);
        props.setModalId(props.buildIndex);
      }}
    >
      <div className={styles.buildingCard}>
        <div className={styles.imgCard}>
          <Image
            src={`/${props.image}`}
            width={256}
            height={256}
            priority
            alt="build-image"
          />
        </div>
        <div className={styles.infosBx}>
          <div className={styles.auctionInfos}>
            <h3>{props.address}</h3>
            <p>
              {props.district}, {props.state}
            </p>
            <p>
              <span>{formatedStartDate}</span> a{" "}
              <span>{formatedMonthEndDate}</span> de {formatedYearEndDate}
            </p>
          </div>
          <div className={styles.tokenContainer}>
            <p>20</p>
            <div>
              <img src="/token_icon.svg" alt="token_icon" />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default BoughtBuildingCard;
