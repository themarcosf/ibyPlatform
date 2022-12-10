import { useState, useEffect } from "react";
import Image from "next/image";
import BoughtBuildingCard from "../components/boughtBuildingCard/boughtBuildingCard";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import SaleModal from "../components/SaleModal/SaleModal";
import styles from "../styles/myContracts.module.scss";
import { redirect } from "next/dist/server/api-utils";

function myContracts({ data }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalId, setModalId] = useState();

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
        <h1>Meus Contratos</h1>
        <div className={styles.filters}>Filtros</div>
        <div className={styles.cardsWrapper}>
          <div className={styles.cardsContainer}>
            {data.map((build) => (
              <BoughtBuildingCard
                image={build.images[0]}
                street={build.street}
                district={build.district}
                state={build.state}
                id={build.id}
                startDate={build.startDate}
                endDate={build.endDate}
                setModalOpen={setModalOpen}
                setModalId={setModalId}
                
              />
            ))}
          </div>
          {modalOpen ? (
            <SaleModal
              street={data[modalId].street}
              image={data[modalId].images[0]}
              district={data[modalId].district}
              state={data[modalId].state}
              id={data[modalId].id}
              startDate={data[modalId].startDate}
              endDate={data[modalId].endDate}
              setModalOpen={setModalOpen}
            />
          ) : null}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default myContracts;

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3333/properties");
  const data = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 60 * 5,
  };
};