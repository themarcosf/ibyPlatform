import styles from "./BuildingCard.module.scss";
import Link from "next/link";
import { formatToCurrency } from "../../functions/formatToCurrency";

function BuildingCard(props) {
  const brlCurrentValue = formatToCurrency.format(props.currentValue);

  return (
    <Link href={`/buildings/${props.id}`}>
      <div className={styles.buildingCard}>
        <div className={styles.imgCard}>
          <img src={`/${props.image}`} alt="build-image" />
        </div>

        <div className={styles.streetBx}>
          <h3>{props.address}</h3>
        </div>
        <p className={styles.address}>
          {props.district}, {props.state}
        </p>
        {props.expired ? (
          <div className={styles.expiradedBx}>
            <p>Leilão expirado</p>
          </div>
        ) : (
          <div className={styles.buildingInfos}>
            <p>{brlCurrentValue}</p>
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
        )}
      </div>
    </Link>
  );
}

export default BuildingCard;
