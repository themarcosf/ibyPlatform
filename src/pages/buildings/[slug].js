import Head from "next/head";

import BuildingPage from "../../components/BuildingPage/BuildingPage";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import styles from "./build.module.scss";

function build({ realtyData }) {
  let realtyAuction = realtyData?.auctions[0];

  let currentValue;
  let lastBidChecking = realtyAuction.bids.slice(-1)[0].bidValue;

  lastBidChecking
    ? (currentValue = lastBidChecking)
    : (currentValue = realtyAuction.minAskValue);

  let realtyAuctionEndDate = new Date(realtyAuction.auctionEndDate).getTime();

  let contractPeriod = realtyAuction.LeaseDurationMonths / 12;

  return (
    <>
      <Head>
        <title>Iby Platform | Imóveis para alugar</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <BuildingPage
          inConstruction={realtyData.inConstruction}
          toRetrofit={realtyData.toRetrofit}
          image={realtyData.images}
          description={realtyData.description}
          address={realtyData.address}
          district={realtyData.district}
          state={realtyData.state}
          sqMeters={realtyData.sqMeters}
          currentValue={currentValue}
          contractPeriod={contractPeriod}
          id={realtyData.id}
          auctionId={realtyAuction.id}
          minPrice={realtyAuction.minPrice}
          active={realtyAuction.active}
          auctionEndDate={realtyAuctionEndDate}
          leaseBeginDate={realtyAuction.leaseBeginDate}
          leaseEndDate={realtyAuction.leaseEndDate}
        />
      </main>

      <Footer />
    </>
  );
}

export default build;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const realtyRes = await fetch(`${process.env.BASEURL}/realty/${slug}`);
  const initialRealtyData = await realtyRes.json();
  const realtyData = initialRealtyData.data._document;

  return {
    props: {
      realtyData,
    },
    revalidate: 60 * 5,
  };
};
