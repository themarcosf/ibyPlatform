import { verifyUser } from "../../functions/verifyUser";

import BuildingCard from "../../components/BuildingCard/BuildingCard";
import Footer from "../../components/Footer/Footer";
import NoRealty from "../../components/NoRealty/NoRealty";
import Header from "../../components/Header/Header";
import Filter from "../../components/Filter/Filter";

import styles from "./pf.module.scss";

function pf({ realtyData }) {
  console.log(realtyData);
  return (
    <>
      <Header />
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>Imóveis para alugar</h1>
          <Filter />
        </div>
        <div className={styles.cardsContainer}>
          {realtyData.map((build) => {
            let realtyAuction = build?.auctions[0];

            if (realtyAuction) {
              let currentMonthValue;
              let lastBidChecking =
                realtyAuction.bids.slice(-1)[0]?.lastBidValue;

              lastBidChecking
                ? (currentMonthValue =
                    lastBidChecking / realtyAuction.LeaseDurationMonths)
                : (currentMonthValue =
                    realtyAuction.minAskValue /
                    realtyAuction.LeaseDurationMonths);

              if (build.toRetrofit == false && build.inConstruction == false) {
                return (
                  <BuildingCard
                    image={build.images[0]}
                    inConstruction={build.inConstruction}
                    toRetrofit={build.toRetrofit}
                    address={build.address}
                    district={build.district}
                    state={build.state}
                    currentMonthValue={currentMonthValue}
                    sqMeters={build.sqMeters}
                    key={build.id}
                    id={build.id}
                    active={realtyAuction.active}
                  />
                );
              } else {
                return <NoRealty />;
              }
            }
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default pf;

export const getStaticProps = async () => {
  const realtyRes = await fetch("http://127.0.0.1:8000/api/v1/realty/");
  const initialRealtyData = await realtyRes.json();
  const realtyData = initialRealtyData.data._documents.filter((elements) => {
    return elements !== null;
  });

  return {
    props: { realtyData },
    revalidate: 60 * 5,
  };
};
