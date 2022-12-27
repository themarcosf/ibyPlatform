import { useState } from "react";

import BuildingCard from "../../components/BuildingCard/BuildingCard";
import Footer from "../../components/Footer/Footer";
import NoRealty from "../../components/NoRealty/NoRealty";
import Header from "../../components/Header/Header";
import Filter from "../../components/Filter/Filter";

import styles from "./fundos.module.scss";

function pj({ realtyData, auctionData }) {
  return (
    <>
      <Header />
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>Pessoa Jurídica</h1>
          <Filter />
        </div>
        <div className={styles.cardsContainer}>
          {realtyData.map((build) => {
            let realtyAuction = auctionData.find(
              (auction) => auction.realtyId === build.id
            );

            let realtyAuctionEndDate = new Date(
              realtyAuction.auctionEndDate
            ).getTime();

            if (
              realtyAuctionEndDate < Date.now() &&
              build.toRetrofit == false &&
              build.inConstruction == true
            ) {
              return (
                <BuildingCard
                  image={build.images[0]}
                  inConstruction={build.inConstruction}
                  toRetrofit={build.toRetrofit}
                  address={build.address}
                  district={build.district}
                  state={build.state}
                  minValue={realtyAuction.minValue}
                  currentValue={realtyAuction.currentValue}
                  sqMeters={build.sqMeters}
                  key={build.id}
                  id={build.id}
                  expired={true}
                />
              );
            } else if (
              realtyAuctionEndDate > Date.now() &&
              build.toRetrofit == false &&
              build.inConstruction == true
            ) {
              return (
                <BuildingCard
                  image={build.images[0]}
                  inConstruction={build.inConstruction}
                  toRetrofit={build.toRetrofit}
                  address={build.address}
                  district={build.district}
                  state={build.state}
                  minValue={realtyAuction.minValue}
                  currentValue={realtyAuction.currentValue}
                  sqMeters={build.sqMeters}
                  key={build.id}
                  id={build.id}
                  expired={false}
                />
              );
            } else {
              return <NoRealty key={0}/>;
            }
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default pj;

export const getStaticProps = async () => {
  const realtyRes = await fetch("http://127.0.0.1:8000/api/v1/realty/");
  const initialRealtyData = await realtyRes.json();
  const realtyData = initialRealtyData.data.realty;

  const auctionRes = await fetch("http://127.0.0.1:8000/api/v1/auction/");
  const initialAuctionData = await auctionRes.json();
  const auctionData = initialAuctionData.data.auction;

  return {
    props: { realtyData, auctionData },
    revalidate: 60 * 5,
  };
};
