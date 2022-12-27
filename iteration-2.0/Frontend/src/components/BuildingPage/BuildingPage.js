import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

import Card from "../Card/Card";

import styles from "./BuildingPage.module.scss";

function BuildingPage(props) {
  const [buildingStatus, setbuildingStatus] = useState("Pronto para morar!");
  const bidInputRef = useRef();

  const brlMinValue = props.minValue.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  const brlCurrentValue = props.currentValue.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  useEffect(() => {
    if (props.inConstruction == true) {
      setbuildingStatus("Em construção");
    } else if (props.toRetrofit == true) {
      setbuildingStatus("Para reforma");
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const enteredBid = bidInputRef.current.value;

    const updatedData = {
      currentValue: enteredBid,
      // lastBidUser: userId,
      // lastBidderWallet: wallet,
    };

    console.log(enteredBid)
    console.log(props.currentValue)

    if (enteredBid > props.currentValue) {
      fetch(`http://127.0.0.1:8000/api/v1/auctions/${props.auctionId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => response.json())
        .then(
          toast.success("Seu lance foi enviado!", {
            position: "bottom-right",
          })
        );
    } else {
      toast.error("Insira um valor maior do que o valor atual", {
        position: "bottom-right",
      });
    }
  }

  const auctionEndDate = new Date(props.auctionEndDate).toLocaleDateString(
    "pt-BR",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const leaseBeginDate = new Date(props.leaseBeginDate).toLocaleDateString(
    "pt-BR",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className={styles.buildingPageContent}>
      <h1>{`${props.address} - ${props.district}, ${props.state}`}</h1>
      <div className={styles.statusAndFavorite}>
        <p>Status: {buildingStatus} </p>
        <span>
          Salvar <img src="/favorite.png" />
        </span>
      </div>
      <div className={styles.imgsContainer}>
        <div>
          <img
            className={styles.firstImg}
            src={`${props.image[0]}`}
            width={500}
            height={330}
            alt="realt_img"
          />
        </div>
        <div>
          <img
            className={styles.secondImg}
            src={`${props.image[1]}`}
            width={500}
            height={330}
            alt="realt_img"
          />
        </div>
        <div>
          <img
            className={styles.thirdImg}
            src={`${props.image[2]}`}
            width={500}
            height={330}
            alt="realt_img"
          />
        </div>
      </div>
      <div className={styles.descriptionAndCard}>
        <div className={styles.descriptionContainer}>
          <h3>Descrição</h3>
          <p>{props.description}</p>
        </div>
        <Card>
          <div className={styles.infoContainer}>
            <p className={styles.currentValue}>
              {props.expired ? "Valor Final:" : "Valor Atual:"}{" "}
              {props.currentValue > props.minValue ? brlCurrentValue : brlMinValue }
            </p>
            <p className={styles.period}>
              Início do contrato no dia {leaseBeginDate}
            </p>
            <p className={styles.period}>Período do contrato de 10 anos</p>
            <p className={styles.period}>
              {props.expired ? (
                <>
                  <p>Esse leilão se encerrou.</p>
                  <p>Verifique seus contratos</p>
                </>
              ) : (
                `Esse leilão se encerra dia ${auctionEndDate}`
              )}
            </p>
          </div>

          {!props.expired && (
            <form className={styles.moneyContainer} onSubmit={handleSubmit}>
              <input
                placeholder="Digite o valor"
                type="number"
                name="bid"
                ref={bidInputRef}
              />

              <button type="submit">Fazer meu lance</button>
              <Toaster />
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}

export default BuildingPage;
