import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

import BoughtBuildingCard from "../components/boughtBuildingCard/boughtBuildingCard";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import SaleModal from "../components/SaleModal/SaleModal";
import Filter from "../components/Filter/Filter";

import styles from "../styles/myContracts.module.scss";

function myContracts({ realtyData, auctionData }) {
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
        <Header />
        <div className={styles.content}>
          <div className={styles.title}>
            <h1>Meus imóveis</h1>
            <Filter />
          </div>
          <div className={styles.cardsWrapper}>
            <div className={styles.cardsContainer}>
              {realtyData.map((build) => {
                let realtyAuction = auctionData.find(
                  (auction) => auction.realtyId === build.id
                );

                const auctionLog = realtyAuction.auctionLog.filter(
                  (elements) => {
                    return elements !== null;
                  }
                );

                const userLastBid = auctionLog
                  .reverse()
                  .find((auction) => auction.lastBidUser == userData.id);

                if (userLastBid) {
                  let winningBid;

                  if (userLastBid.lastBidValue >= auctionLog[0].lastBidValue) {
                    winningBid = true;
                  } else winningBid = false;

                  const buildIndex = realtyData.indexOf(build);
                  const realtyAuctionIndex = auctionData.indexOf(realtyAuction);

                  if (winningBid && !realtyAuction.active) {
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
                        realtyAuctionIndex={realtyAuctionIndex}
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

  const realtyRes = await fetch("http://127.0.0.1:8000/api/v1/realty/");
  const initialRealtyData = await realtyRes.json();
  const realtyData = initialRealtyData.data.realty.filter((elements) => {
    return elements !== null;
  });

  const auctionRes = await fetch("http://127.0.0.1:8000/api/v1/auction/");
  const initialAuctionData = await auctionRes.json();
  const auctionData = initialAuctionData.data.auction;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { realtyData: realtyData, auctionData: auctionData },
  };
}

export default myContracts;
