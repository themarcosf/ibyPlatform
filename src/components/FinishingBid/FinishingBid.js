import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import cookieCutter from "cookie-cutter";

import { formatToCurrency } from "../../functions/formatToCurrency";

import styles from "./FinishingBid.module.scss";

async function makeBid(fetchData, jwtCookie, router, setFetchLoading) {
  setFetchLoading(true);

  await fetch(`${process.env.BASEURL}/bid`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${jwtCookie}`,
    },
    body: JSON.stringify(fetchData),
  })
    .then((response) => response.json())

  router.push("/myBids");
}

function FinishingBid(props) {
  const router = useRouter();
  const [auctionData, setAuctionData] = useState();
  const jwtCookie = cookieCutter.get("jwt");

  useEffect(() => {
    setAuctionData(JSON.parse(localStorage.getItem("auctionData")));
  }, []);

  if (auctionData) {
    function makeBidHandler() {
      const fetchData = {
        auctionId: auctionData.auctionId,
        userId: props.bidData.lastBidUser,
        bidValue: Number(props.bidData.lastBidValue),
      };

      makeBid(fetchData, jwtCookie, router, props.setFetchLoading);
    }
    const brlLastBidValue = formatToCurrency.format(props.bidData.lastBidValue);
    const brlMinPrice = formatToCurrency.format(auctionData.minPrice);
    const brlCurrentValue = formatToCurrency.format(auctionData.currentValue);
    return (
      <>
        <div className={styles.content}>
          <h1>Finalizar lance</h1>
          <div className={styles.infoContainer}>
            <p>Valor mínimo: {brlMinPrice}</p>
            <p>Período: 10 anos</p>
            <h3>Valor atual: {brlCurrentValue}</h3>
            <h2>Seu Lance é: {brlLastBidValue}</h2>
          </div>
        </div>
        {props.showBidBtn && (
          <>
            <div className={styles.bidBtnBx}>
              <button onClick={makeBidHandler}>Fazer meu lance</button>
            </div>
          </>
        )}
      </>
    );
  } else {
    return <p>Carregando</p>;
  }
}

export default FinishingBid;
