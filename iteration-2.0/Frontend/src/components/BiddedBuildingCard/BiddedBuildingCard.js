import styles from "./BiddedBuildingCard.module.scss";
import Link from "next/link";
import { formatToCurrency } from "../../functions/formatToCurrency";

function BiddedBuildingCard(props) {
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
            {props.winningBid ? (
              <div className={styles.winningBidTrue}>
                <p>
                  Seu lance está <br /> na frente
                </p>
              </div>
            ) : (
              <div className={styles.winningBidFalse}>
                <p>
                  Seu lance não <br /> está na frente
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

export default BiddedBuildingCard;
