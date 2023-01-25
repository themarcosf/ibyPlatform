import Link from "next/link";
import Lottie from "lottie-react";

import workingMan from "../../../public/working-lottie.json";
import noResult from "../../../public/no-result-lottie.json";

import styles from "./NoContent.module.scss";

function NoContent(props) {
  return (
    <div className={styles.content}>
      <div className={styles.textConatainer}>
        {props.page == "myBids" && (
          <h1>
            Você não realizou nenhum <br /> lance ainda
          </h1>
        )}
        {props.page == "myContracts" && (
          <h1>
            Você não possui nenhum <br /> contrato ainda
          </h1>
        )}
        {props.page == "dev" && <h1>Em breve,</h1>}

        {(props.page == "myBids" || props.page == "myContracts") && (
          <h3>Clique abaixo para ver os imóveis disponíveis</h3>
        )}
        {(props.page == "myBids" || props.page == "myContracts") && (
          <div className={styles.btnContainer}>
            <Link href={"/toRent"}>Imóveis para alugar</Link>
          </div>
        )}
        {props.page == "dev" && (
          <h3>
            aguarde para mais <br /> informações.
          </h3>
        )}
      </div>
      <div className={styles.lottie}>
        {(props.page == "myBids" || props.page == "myContracts") && (
          <Lottie animationData={noResult} />
        )}
        {props.page == "dev" && <Lottie animationData={workingMan} />}
      </div>
    </div>
  );
}

export default NoContent;
