import Head from "next/head";

import BuildingCard from "../components/BuildingCard/BuildingCard";
import Footer from "../components/Footer/Footer";
import NoRealty from "../components/NoRealty/NoRealty";
import Header from "../components/Header/Header";
import Filter from "../components/Filter/Filter";

import styles from "../styles/toRent.module.scss";

function pf({ realtyData }) {
  return (
    <>
      <Head>
        <title>Iby Platform | Imóveis para alugar</title>
      </Head>
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
              let lastBidChecking = realtyAuction.bids.slice(-1)[0].bidValue;

              lastBidChecking
                ? (currentMonthValue =
                    lastBidChecking / realtyAuction.LeaseDurationMonths)
                : (currentMonthValue =
                    realtyAuction.minPrice / realtyAuction.LeaseDurationMonths);

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
  const realtyRes = await fetch(`${process.env.BASEURL}/realty/`);
  const initialRealtyData = await realtyRes.json();
  const realtyData = initialRealtyData.data._documents.filter((elements) => {
    return elements !== null;
  });

  return {
    props: { realtyData },
    revalidate: 60 * 5,
  };
};
