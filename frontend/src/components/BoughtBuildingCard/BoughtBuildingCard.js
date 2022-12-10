import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import Image from "next/image";
import styles from "./BoughtBuildingCard.module.scss";

function BoughtBuildingCard( props ) {
  const formatedStartDate = format(parseISO(props.startDate), "MMMM", {
    locale: ptBR,
  });
  const formatedMonthEndDate = format(parseISO(props.endDate), "MMMM", {
    locale: ptBR,
  });
  const formatedYearEndDate = format(parseISO(props.endDate), "yyyy", {
    locale: ptBR,
  });

  return (
    <button 
      style={{all: 'unset', cursor: 'pointer'}}
      onClick={() => {
        props.setModalOpen(true);
        props.setModalId(props.id);
      }}
    >
      <div className={styles.buildingCard}>
        <div className={styles.imgCard}>
          <Image
            src={`${props.image}`}
            width={256}
            height={256}
            priority
            alt="build-image"
          />
        </div>
        <div className={styles.infosBx}>
          <h3>{props.street}</h3>
          <p>
            {props.district}, {props.state}
          </p>
          <p>
            <span>{formatedStartDate}</span> a{" "}
            <span>{formatedMonthEndDate}</span> de {formatedYearEndDate}
          </p>
        </div>
      </div>
    </button>
  );
}

export default BoughtBuildingCard;
