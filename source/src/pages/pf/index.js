import Image from "next/image";
import BuildingCard from "../../components/BuildingCard/BuildingCard";
import Filter from "../../components/Filter/Filter";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./pf.module.scss";

function pf({ realtyData }) {
  return (
    <>
      <Header>
        <Image
          src="/iby_logo.svg"
          width={220}
          height={130}
          alt="iby_logo"
          priority
        />
        <NavBar />
      </Header>
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>Pessoa Física</h1>
          <Filter />
        </div>
        <div className={styles.cardsContainer}>
          {realtyData.map((build) => {
            if (
              build.auctionEndDate > Date.now() &&
              build.toRetrofit == false &&
              build.inConstruction == false
            ) {
              return (
                <BuildingCard
                  image={build.images[0]}
                  inConstruction={build.inConstruction}
                  toRetrofit={build.toRetrofit}
                  streetAddress={build.streetAddress}
                  neighborhood={build.neighborhood}
                  state={build.state}
                  price={build.price}
                  sqMeters={build.sqMeters}
                  lastBidValue={build?.lastBidValue}
                  minValue={build?.minValue}
                  id={build._id}
                  expired={false}
                />
              );
            } else if (
              build.toRetrofit == false &&
              build.inConstruction == false
            ) {
              return (
                <BuildingCard
                  image={build.images[0]}
                  inConstruction={build.inConstruction}
                  toRetrofit={build.toRetrofit}
                  streetAddress={build.streetAddress}
                  neighborhood={build.neighborhood}
                  state={build.state}
                  price={build.price}
                  sqMeters={build.sqMeters}
                  lastBidValue={build?.lastBidValue}
                  minValue={build?.minValue}
                  id={build._id}
                  expired={true}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default pf;

export const getStaticProps = async () => {
  const realtyRes = await fetch("http://127.0.0.1:8000/api/v1/realty/");
  const initialRealtyData = await realtyRes.json();
  const realtyData = initialRealtyData.data._realty;

  return {
    props: {
      realtyData,
    },
    revalidate: 60 * 5,
  };
};
