import Image from "next/image";
import styles from "./BuildingCard.module.scss";
import Link from "next/link";

function BuildingCard(props) {

  // Rua travessa 123 não possui min value(apos reinicar o db pode retirar os "?" pois todos os imoveis precisam ter minValue
  const brlMinValue = props?.minValue?.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  const brlLastBidValue = props?.lastBidValue?.toLocaleString("pt-br", {
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
          <h3>{props.streetAddress}</h3>
          <span href="#">
            <img style={{ width: "22px" }} src="/heartIcon.png" />
          </span>
        </div>
        <p className={styles.address}>
          {props.neighborhood}, {props.state}
        </p>
        {props.expired ? (
          <div className={styles.expiradedBx}>
            <p>Leilão expirado</p>
          </div>
        ) : (
          <div className={styles.buildingInfos}>
            <p>{props.lastBidValue ? brlLastBidValue : brlMinValue}</p>
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
