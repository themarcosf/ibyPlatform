import Lottie from "lottie-react";

import workingMan from "../../../public/working-lottie.json";

import styles from "./NoRealty.module.scss";

function NoRealty() {
  return (
    <div className={styles.content}>
      <div className={styles.textConatainer}>
        <h1>Em breve,</h1>
        <h3>aguarde para mais <br/> informações.</h3>
      </div>
      <div className={styles.lottie}>
        <Lottie animationData={workingMan} />
      </div>
    </div>
  );
}

export default NoRealty;
