import Image from "next/image";
import styles from "./BuildingCard.module.scss";
import Link from "next/link";

function BuildingCard(props) {
  const price = props.price;
  const brlPrice = price.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <Link href={`/buildings/${props.id}`}>
      <div className={styles.buildingCard}>
        <div className={styles.imgCard}>
          <Image
            src={`${props.image}`}
            width={277}
            height={262}
            priority
            alt="build-image"
          />
        </div>

        <div className={styles.streetBx}>
          <h3>{props.street}</h3>
          <span href="#">
            <img style={{width:"22px"}} src="/heartIcon.png" />
          </span>
        </div>
        <p className={styles.address}>
          {props.district}, {props.state}
        </p>
        <div className={styles.buildingInfos}>
          <p>{brlPrice}</p>
          <div className={styles.meters}>
            <img  style={{width:"25px", marginRight:"3px"}} src={"/regua.png"} />
            <p>
              {props.area}m<sup>2</sup>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BuildingCard;