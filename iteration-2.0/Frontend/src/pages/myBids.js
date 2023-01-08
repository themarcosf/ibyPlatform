import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import BiddedBuildingCard from "../components/BiddedBuildingCard/BiddedBuildingCard";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import styles from "../styles/myBids.module.scss";

function myBids({ realtyData, auctionData }) {
  const [userData, setUserData] = useState();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, []);

  if (userData) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <h1>Leilões que estou participando</h1>
          <div className={styles.content}>
            {realtyData.map((build) => {
              let realtyAuction = auctionData.find(
                (auction) => auction.realtyId === build.id
              );

              const auctionLog = realtyAuction.auctionLog.filter((elements) => {
                return elements !== null;
              });

              const userLastBid = auctionLog
                .reverse()
                .find((auction) => auction.lastBidUser == userData.id);

              if (userLastBid) {
                let winningBid;

                if (userLastBid.lastBidValue >= auctionLog[0].lastBidValue) {
                  winningBid = true;
                } else winningBid = false;

                let currentValue;
                let lastBidChecking =
                  realtyAuction.auctionLog.slice(-1)[0]?.lastBidValue;

                lastBidChecking
                  ? (currentValue = lastBidChecking)
                  : (currentValue = realtyAuction.minAskValue);

                return (
                  <BiddedBuildingCard
                    image={build.images[0]}
                    address={build.address}
                    district={build.district}
                    state={build.state}
                    currentValue={currentValue}
                    key={build.id}
                    id={build.id}
                    winningBid={winningBid}
                    expired={build.active}
                  />
                );
              }
            })}
          </div>
        </main>
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

export default myBids;
