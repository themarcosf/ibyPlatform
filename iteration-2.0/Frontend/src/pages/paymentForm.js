import { useEffect, useState } from "react";

import MultiStepProgressBar from "../components/MultiStepProgressBar/MultiStepProgressBar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import styles from "../styles/paymentForm.module.scss";
import ContactForm from "../components/ContactForm/ContactForm";

function paymentForm() {
  const [index, setIndex] = useState(1);
  const [userData, setUserData] = useState();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, []);

  function prevButton() {
    if (index > 1) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  }

  function nextButton() {
    // if (index < 3) {
    //   setIndex((prevIndex) => prevIndex + 1);
    // }
  }

  if (userData) {
    console.log(userData);
    return (
      <>
        <Header />
        <main className={styles.main}>
          <MultiStepProgressBar step={index} />
          <div className={styles.formContainer}>
            {index === 1 && <ContactForm username={userData.username} />}
            {index === 2 && <p>segundo form</p>}
            {index === 3 && <p>terceiro form</p>}
          </div>
          <div className={styles.btnContainer}>
            <button
              onClick={prevButton}
              disabled={index === 1}
              className={styles.btn}
            >
              Previous
            </button>
            <button
              type="submit"
              form="contactForm"
              onClick={nextButton}
              className={styles.btn}
            >
              Next
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  } else {
    return <p>carregando</p>;
  }
}

export default paymentForm;
