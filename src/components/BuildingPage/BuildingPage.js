import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AiOutlineHeart } from "react-icons/ai";
import IntlCurrencyInput from "react-intl-currency-input";

import { formatToCurrency } from "../../functions/formatToCurrency";
import { getUserData } from "../../functions/getUserData";

import styles from "./BuildingPage.module.scss";

function BuildingPage(props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [buildingStatus, setbuildingStatus] = useState("Pronto para morar!");
  const [bidValue, setBidVaule] = useState();

  const currencyConfig = {
    locale: "pt-BR",
    formats: {
      number: {
        BRL: {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  };

  const brlCurrentValue = formatToCurrency.format(props.currentValue);

  useEffect(() => {
    if (props.inConstruction == true) {
      setbuildingStatus("Em construção");
    } else if (props.toRetrofit == true) {
      setbuildingStatus("Para reforma");
    }
  }, []);

  function handleBlur(event, value) {
    event.preventDefault();

    setBidVaule(value);
  }

  function favoriteHandler() {
    toast.loading("Feature em desenvolvimento", {
      duration: 3000,
      position: "bottom-right",
    });
  }

  async function handleSubmit(event, value) {
    event.preventDefault();

    if (session) {
      if (bidValue > props.currentValue) {
        const userData = await getUserData();

        localStorage.setItem("userData", JSON.stringify(userData));

        const bidData = {
          lastBidValue: bidValue,
          lastBidUser: userData.id,
          lastBidderWallet: userData.wallet,
        };

        localStorage.setItem("bidData", JSON.stringify(bidData));

        const auctionData = {
          minPrice: props.minPrice,
          currentValue: props.currentValue,
          auctionId: props.auctionId,
        };

        localStorage.setItem("auctionData", JSON.stringify(auctionData));

        if (userData.wallet && userData.nationalId && userData.mobile) {
          router.push("/paymentForm/2");
        } else {
          router.push("/paymentForm/1");
        }
      } else {
        toast.error("Insira um valor maior do que o valor atual", {
          position: "bottom-right",
        });
      }
    } else {
      toast.error("Você precisa estar logado para realizar um lance", {
        position: "bottom-right",
      });
    }
  }

  const auctionEndDate = new Date(
    props.auctionEndDate * 1000
  ).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
          Gostei <AiOutlineHeart onClick={favoriteHandler} fill="#2e65bc" />
        </span>
      </div>
      <div className={styles.imgsContainer}>
        <div>
          <img
            className={styles.firstImg}
            src={`/${props.image[0]}`}
            width={500}
            height={330}
            alt="realt_img"
          />
        </div>
        <div>
          <img
            className={styles.secondImg}
            src={`/${props.image[1]}`}
            width={500}
            height={330}
            alt="realt_img"
          />
        </div>
        <div>
          <img
            className={styles.thirdImg}
            src={`/${props.image[2]}`}
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
        <div className={styles.infoContainer}>
          <p className={styles.currentValue}>
            {props.active ? "Valor Atual:" : "Valor Final:"} {brlCurrentValue}
          </p>
          <p className={styles.period}>
            Início do contrato no dia {leaseBeginDate}
          </p>
          <p className={styles.period}>
            Período do contrato de {props.contractPeriod} anos
          </p>
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

          {!props.expired && (
            <form className={styles.moneyContainer} onSubmit={handleSubmit}>
              <IntlCurrencyInput
                className={styles.currencyInput}
                currency="BRL"
                config={currencyConfig}
                onBlur={handleBlur}
              />
              <button type="submit">Fazer meu lance</button>
              <Toaster />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuildingPage;
