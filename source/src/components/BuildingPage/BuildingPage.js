import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

import Card from "../Card/Card";

import styles from "./BuildingPage.module.scss";

function BuildingPage(props) {
  const [buildingStatus, setbuildingStatus] = useState("Pronto para morar!");
  const [realtyValue, setRealtyValue] = useState(
    props?.lastBidValue > props.minValue ? props.lastBidValue : props.minValue
  );

  let wallet
  let userId

  if (typeof window !== "undefined") {
    wallet = JSON.parse(localStorage.userData).wallet
    userId = JSON.parse(localStorage.userData).id
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const makeBid = (data) => {
    const updatedData = {
      lastBidValue: data.bid,
      lastBidUser: userId,
      lastBidderWallet: wallet,
    };

    if (data.bid > realtyValue) {
      toast.success("Seu lance foi enviado!", {
        position: "bottom-right",
      });
      fetch(`http://127.0.0.1:8000/api/v1/auctions/${props.auctionId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => response.json())
        .then(console.log("feito"));
    } else {
      toast.error("Insira um valor maior do que o valor atual", {
        position: "bottom-right",
      });
    }
  };

  const auctionEndDate = new Date(props.auctionEndDate).toLocaleDateString(
    "pt-BR",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const leaseBeginDate = new Date(props.leaseBeginDate).toLocaleDateString(
    "pt-BR",
    { year: "numeric", month: "long", day: "numeric" }
  );

  useEffect(() => {
    if (props.inConstruction == true) {
      setbuildingStatus("Em construção");
    } else if (props.toRetrofit == true) {
      setbuildingStatus("Para reforma");
    }
  }, []);

  return (
    <div className={styles.buildingPageContent}>
      <h1>{`${props.streetAddress} - ${props.neighborhood}, ${props.state}`}</h1>
      <div className={styles.statusAndFavorite}>
        <p>Status: {buildingStatus} </p>
        <span>
          Salvar <img src="/favorite.png" />
        </span>
      </div>
      <div className={styles.imgsContainer}>
        <div>
          <Image
            className={styles.firstImg}
            src={`${props.image[0]}`}
            width={500}
            height={330}
          />
        </div>
        <div>
          <Image
            className={styles.secondImg}
            src={`${props.image[1]}`}
            width={500}
            height={330}
          />
        </div>
        <div>
          <Image
            className={styles.thirdImg}
            src={`${props.image[2]}`}
            width={500}
            height={330}
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
              {props.auctionEndDate < Date.now()
                ? "Valor Atual:"
                : "Valor Final:"}{" "}
              {realtyValue?.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p className={styles.period}>
              Início do contrato no dia {leaseBeginDate}
            </p>
            <p className={styles.period}>Período do contrato de 10 anos</p>
            <p className={styles.period}>
              {props.auctionEndDate < Date.now() ? (
                `Esse leilão se encerra dia ${auctionEndDate}`
              ) : (
                <>
                  <p>Esse leilão se encerrou.</p>
                  <p>Verifique seus contratos</p>
                </>
              )}
            </p>
          </div>

          {props.auctionEndDate < Date.now() ? (
            <form
              className={styles.moneyContainer}
              onSubmit={handleSubmit(makeBid)}
            >
              <input
                placeholder="Digite o valor"
                type="number"
                name="bid"
                {...register("bid")}
              />

              <button type="submit">Fazer meu lance</button>
              <Toaster />
            </form>
          ) : null}
        </Card>
      </div>
    </div>
  );
}

export default BuildingPage;
