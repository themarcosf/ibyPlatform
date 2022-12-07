import Image from "next/image";
import styles from "./BuildingCard.module.scss";
import Card from "../Card/Card";
import Link from "next/link";

function BuildingCard(props) {
  const price = props.price;
  var brlPrice = price.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className={styles.buildingCard}>
      <div className={styles.imgCard}>
        <Link href={"#"}>
          <Image
            src={`${props.image}`}
            width={256}
            height={264}
            priority
            alt="build-image"
          />
        </Link>
      </div>
      <div className={styles.streetBx}>
        <h3>{props.street}</h3>
        <a href="#">
          <img src="/favorite.png" />
        </a>
      </div>
      <p className={styles.address}>
        {props.district}, {props.state}
      </p>
      <div className={styles.buildingInfos}>
        <p>{brlPrice}</p>
        <div className={styles.meters}>
          <img src={"/meter.png"} />
          <p>
            {props.area}m<sup>2</sup>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BuildingCard;
