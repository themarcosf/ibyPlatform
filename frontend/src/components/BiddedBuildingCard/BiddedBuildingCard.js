import Link from "next/link";

import { formatToCurrency } from "../../functions/formatToCurrency";

import styles from "./BiddedBuildingCard.module.scss";

function BiddedBuildingCard(props) {
  const brlCurrentValue = formatToCurrency.format(props.currentValue);
  const brluserBid = formatToCurrency.format(props.userBid);

  return (
    <Link href={`/buildings/${props.id}`}>
      <div className={styles.buildingCard}>
        <div className={styles.imgCard}>
          <img src={`/${props.id}/image-1.jpg`} alt="build-image" />
        </div>

        <div className={styles.streetBx}>
          <h3>{props.address}</h3>
        </div>
        <p className={styles.address}>
          {props.district}, {props.state}
        </p>

        <div className={styles.buildingInfos}>
          <div className={styles.valuesContainer}>
            <span>Seu lance:</span>
            <p>{brluserBid}</p>
            <span>Valor Atual:</span>
            <p>{brlCurrentValue}</p>
          </div>
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
      </div>
    </Link>
  );
}

export default BiddedBuildingCard;
