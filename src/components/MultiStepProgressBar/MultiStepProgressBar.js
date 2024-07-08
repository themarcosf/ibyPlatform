import { ProgressBar, Step } from "react-step-progress-bar";

import "react-step-progress-bar/styles.css";
import styles from "./MultiStepProgressBar.module.scss";

function MultiStepProgressBar(props) {
  return (
    <ProgressBar
      percent={((props.step - 1) * 100) / 2}
      filledBackground="#2E65BC"
      height={2}
      width={300}
    >
      <Step transition="scale">
        {({ accomplished, index }) => (
            <div className={`${styles.step} ${accomplished ? styles.complete : null}`}>
                
            </div>
)}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
            <div className={`${styles.step} ${accomplished ? styles.complete : null}`}>
                
            </div>
)}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
            <div className={`${styles.step} ${accomplished ? styles.complete : null}`}>
                
            </div>
)}
      </Step>
    </ProgressBar>
  );
}

export default MultiStepProgressBar;
