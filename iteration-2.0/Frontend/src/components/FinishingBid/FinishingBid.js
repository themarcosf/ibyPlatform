import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { formatToCurrency } from "../../functions/formatToCurrency";

import styles from "./FinishingBid.module.scss";

async function makeBid(fetchData, auctionId) {
  fetch(`http://127.0.0.1:8000/api/v1/auction/${auctionId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(fetchData),
  })
    .then((response) => response.json())
    .then(
      toast.success("Seu lance foi enviado!", {
        position: "bottom-right",
      })
    );
}

function FinishingBid(props) {
  const [auctionData, setAuctionData] = useState();

  useEffect(() => {
    setAuctionData(JSON.parse(localStorage.getItem("auctionData")));
  }, []);

  if (auctionData) {
    function makeBidHandler() {
      const fetchData = {
        auctionLog: {
          lastBidValue: Number(props.bidData.lastBidValue),
          lastBidUser: props.bidData.lastBidUser,
          lastBidderWallet: props.bidData.lastBidderWallet,
        },
      };

      makeBid(fetchData, auctionData.auctionId);
    }
    const brlLastBidValue = formatToCurrency.format(props.bidData.lastBidValue);
    const brlMinAskValue = formatToCurrency.format(auctionData.minAskValue);
    const brlCurrentValue = formatToCurrency.format(auctionData.currentValue);
    return (
      <>
        <div className={styles.content}>
          <h1>Finalizar lance</h1>
          <div className={styles.infoContainer}>
            <p>Valor mínimo:{brlMinAskValue}</p>
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
            <Toaster />
          </>
        )}
      </>
    );
  } else {
    return <p>Carregando</p>;
  }
}

export default FinishingBid;
