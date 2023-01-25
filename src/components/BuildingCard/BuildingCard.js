import Link from "next/link";

import { formatToCurrency } from "../../functions/formatToCurrency";

import styles from "./BuildingCard.module.scss";

function BuildingCard(props) {
  const brlCurrentMonthValue = formatToCurrency.format(props.currentMonthValue);

  return (
    <Link href={`/buildings/${props.id}`}>
      <div className={styles.buildingCard}>
        <div className={styles.imgCard}>
          {props.active && (
            <div>
              <p>Expirado</p>
            </div>
          )}
          <img src={`/${props.image}`} alt="build-image" />
        </div>

        {!props.active ? (
          <>
            <div className={styles.streetBx}>
              <h3>{props.address}</h3>
            </div>
            <p className={styles.address}>
              {props.district}, {props.state}
            </p>
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
          </>
        ) : (
          <div className={styles.expiradedText}>
            <p>Este leilão se encerrou</p>
          </div>
        )}
      </div>
    </Link>
  );
}

export default BuildingCard;
