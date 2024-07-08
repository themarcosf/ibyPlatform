import Link from "next/link";

import { formatToCurrency } from "../../functions/formatToCurrency";

import styles from "./BuildingCard.module.scss";

function BuildingCard(props) {
  const brlCurrentMonthValue = formatToCurrency.format(props.currentMonthValue);

  return (
    <Link href={`/buildings/${props.id}`}>
      <div className={styles.buildingCard}>
        <div>
          <div className={styles.imgCard}>
            <img src={`/${props.id}/image-1.jpg`} alt="build-image" />
          </div>
          <div className={styles.streetBx}>
            <h3>{props.address}</h3>
          </div>
          <p className={styles.address}>
            {props.district}, {props.state}
          </p>
        </div>
        <div className={styles.buildingInfos}>
          <p>
            {brlCurrentMonthValue} <span>/mês</span>
          </p>
          <div className={styles.meters}>
            <img
              style={{ width: "25px", marginRight: "3px" }}
              src={"/regua.png"}
            />
            <p>
              {props.sqMeters}m<sup>2</sup>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BuildingCard;
