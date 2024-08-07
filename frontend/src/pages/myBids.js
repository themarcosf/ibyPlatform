import Head from "next/head";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

import BiddedBuildingCard from "../components/BiddedBuildingCard/BiddedBuildingCard";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

import styles from "../styles/myBids.module.scss";
import NoContent from "../components/NoContent/NoContent";

function myBids({ realtyData }) {
  const [userData, setUserData] = useState();
  const [content, setContent] = useState(false);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, []);

  if (userData) {
    return (
      <>
        <Head>
          <title>Iby Platform | Meus lances</title>
        </Head>
        <Header />
        <main className={styles.main}>
          <h1>Leilões que estou participando</h1>
          <div className={styles.content}>
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
                let currentValue;

                if (userLastBid.bidValue >= bids[0].bidValue) {
                  winningBid = true;
                } else winningBid = false;

                let lastBidChecking = bids[0]?.bidValue;

                lastBidChecking
                  ? (currentValue = lastBidChecking)
                  : (currentValue = realtyAuction.minPrice);

                if (userLastBid.bidValue < realtyAuction.flashPrice) {
                  if (!content) {
                    setContent(true);
                  }
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
                      userBid={userLastBid.bidValue}
                    />
                  );
                }
              }
            })}
            {!content && <NoContent page={"myBids"} />}
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

export default myBids;
