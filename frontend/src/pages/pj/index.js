import Image from "next/image";
import BuildingCard from "../../components/BuildingCard/BuildingCard";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./pj.module.scss";

function pf({ data }) {
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
        <h1>Pessoa Jurídica</h1>
        <div className={styles.filters}>Filtros</div>
        <div className={styles.cardsContainer}>
          {data.map((build) => (
            <BuildingCard
              image={build.images[0]}
              isBuilding={build.isBuilding}
              street={build.street}
              district={build.district}
              state={build.state}
              price={build.price}
              area={build.area}
              id={build.id}
            />
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default pf;

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3333/properties");
  const data = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 60 * 5
  };
};
