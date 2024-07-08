import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { TailSpin } from "react-loader-spinner";

import MultiStepProgressBar from "../../components/MultiStepProgressBar/MultiStepProgressBar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ContactForm from "../../components/ContactForm/ContactForm";
import PaymentMethodForm from "../../components/PaymentMethodForm/PaymentMethodForm";
import FinishingBid from "../../components/FinishingBid/FinishingBid";

import styles from "./paymentForm.module.scss";

function paymentForm(slug) {
  const [index, setIndex] = useState(Number(slug.slug));
  const [showBtn, setShowBtn] = useState(true);
  const [showBidBtn, setShowBidBtn] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [disable, setDisable] = useState(false);
  const [userData, setUserData] = useState();
  const [bidData, setBidData] = useState();
  const [fetchLoading, setFetchLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    index == 2 && setShowBtn(false);
    index == 3 && setShowBtn(false);
    index == 3 && setShowBidBtn(true);
    index == 1 && setDisable(true);

    setUserData(JSON.parse(localStorage.getItem("userData")));
    setBidData(JSON.parse(localStorage.getItem("bidData")));
  }, [index]);

  function prevButton() {
    if (index == 1) {
      router.back();
    }

    if (index == 2) {
      setShowBtn(false);
      setShowCard(false);
      return;
    }

    if (index > 1) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  }

  function nextButton() {
    if (index < 3) {
      setIndex((prevIndex) => prevIndex + 1);
    }

    setDisable(false);
  }

  if (userData && bidData) {
    return (
      <>
        <Head>
          <title>Iby Platform | Meio de pagamento</title>
        </Head>
        <Header />
        {!fetchLoading ? (
          <main className={styles.main}>
            <MultiStepProgressBar step={index} />
            <div className={styles.formContainer}>
              {index == 1 && (
                <ContactForm
                  showBtnHandler={setShowBtn}
                  userData={userData}
                  nextButton={nextButton}
                />
              )}
              {index == 2 && (
                <PaymentMethodForm
                  showBtnHandler={setShowBtn}
                  nextButton={nextButton}
                  showCard={showCard}
                  setShowCard={setShowCard}
                />
              )}
              {index == 3 && (
                <FinishingBid
                  bidData={bidData}
                  showBidBtn={showBidBtn}
                  fetchLoading={fetchLoading}
                  setFetchLoading={setFetchLoading}
                />
              )}
            </div>
            {showBtn && (
              <div className={styles.btnContainer}>
                <button onClick={prevButton} className={`${styles.btn}`}>
                  Voltar
                </button>
                <button type="submit" form="form" className={styles.btn}>
                  {index == 3 ? "Fazer lance" : "Avançar"}
                </button>
              </div>
            )}
          </main>
        ) : (
          <div className={styles.loadingMain}>
            <TailSpin
              height="80"
              width="80"
              color="#2e65bc"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
        <Footer />
      </>
    );
  } else {
    return <p>carregando</p>;
  }
}

export default paymentForm;

export const getServerSideProps = async (ctx) => {
  const slug = ctx.params.slug[0];
  const session = await getSession({ req: ctx.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      slug,
    },
  };
};
