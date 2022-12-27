import Image from "next/image";
import styles from "./BuildingCard.module.scss";
import Link from "next/link";

function BuildingCard(props) {
  const brlMinValue = props.minValue.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  const brlCurrentValue = props.currentValue.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <Link href={`/buildings/${props.id}`}>
      <div className={styles.buildingCard}>
        <div className={styles.imgCard}>
          <img
            src={`${props.image}`}
            alt="build-image"
          />
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
            <p>{props.currentValue ? brlCurrentValue : brlMinValue}</p>
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
