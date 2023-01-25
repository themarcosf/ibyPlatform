import { motion } from "framer-motion";

import styles from "./InfoModal.module.scss";

function InfoModal(props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 50,
      }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.3,
        },
      }}
      className={styles.modalContentWrapper}
    >
      <motion.div
        className={styles.modalContent}
      >
        {props.children}
      </motion.div>
    </motion.div>
  );
}

export default InfoModal;
