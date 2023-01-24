import Head from "next/head";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

import BoughtBuildingCard from "../components/BoughtBuildingCard/BoughtBuildingCard";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import SaleModal from "../components/SaleModal/SaleModal";
import Filter from "../components/Filter/Filter";

import styles from "../styles/myContracts.module.scss";

function myContracts({ realtyData }) {
  const [showModal, setShowModal] = useState(false);
  const [modalId, setModalId] = useState();
  const [auctionModalId, setAuctionModalId] = useState();
  const [userData, setUserData] = useState();
  const [noBuilds, setNoBuilds] = useState(false);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, []);

  if (userData) {
    return (
      <>
        <Head>
          <title>Iby Platform | Meus imóveis</title>
        </Head>
        <Header />
        <div className={styles.content}>
          <div className={styles.title}>
            <h1>Meus Contratos</h1>
            <Filter />
          </div>
          <div className={styles.cardsWrapper}>
            <div className={styles.cardsContainer}>
              {realtyData.map((build) => {
                let realtyAuction = build?.auctions[0];

                const bids = realtyAuction?.bids.filter((elements) => {
                  return elements !== null;
                });

                const userLastBid = bids
                  ?.reverse()
                  .find((bid) => bid.userId == userData.id);

                if (userLastBid) {
                  let winningBid;

                  if (userLastBid.bidValue >= bids[0].bidValue) {
                    winningBid = true;
                  } else winningBid = false;

                  const buildIndex = realtyData.indexOf(build);

                  if (winningBid && realtyAuction.active) {
                    return (
                      <BoughtBuildingCard
                        image={build.images[0]}
                        address={build.address}
                        district={build.district}
                        state={build.state}
                        setShowModal={setShowModal}
                        setModalId={setModalId}
                        buildIndex={buildIndex}
                        setAuctionModalId={setAuctionModalId}
                        id={build.id}
                        leaseBeginDate={realtyAuction.leaseBeginDate}
                        leaseEndDate={realtyAuction.leaseEndDate}
                      />
                    );
                  }
                }
              })}
            </div>
            {/* {showModal ? (
              <SaleModal
                address={realtyData[modalId].address}
                image={realtyData[modalId].images[0]}
                district={realtyData[modalId].district}
                state={realtyData[modalId].state}
                id={realtyData[modalId].id}
                setShowModal={setShowModal}
                leaseBeginDate={auctionData[auctionModalId].leaseBeginDate}
                leaseEndDate={auctionData[auctionModalId].leaseEndDate}
              />
            ) : null} */}
          </div>
        </div>

        <Footer />
      </>
    );
  } else {
    return <p>Carregando</p>;
  }
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  const realtyRes = await fetch(`${process.env.BASEURL}/realty/`);
  const initialRealtyData = await realtyRes.json();
  const realtyData = initialRealtyData.data._documents.filter((elements) => {
    return elements !== null;
  });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { realtyData },
  };
}

export default myContracts;
