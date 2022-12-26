import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

import BoughtBuildingCard from "../components/boughtBuildingCard/boughtBuildingCard";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import SaleModal from "../components/SaleModal/SaleModal";
import Filter from "../components/Filter/Filter";

import styles from "../styles/myContracts.module.scss";

function myContracts() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalId, setModalId] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const userId = JSON.parse(localStorage.userData).id;

    fetch(`http://127.0.0.1:8000/api/v1/users/${userId}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json.data.auctions);
      });
  }, []);

  console.log(data);

  return (
    <>
      {data ? (
        <>
          <Header />
          <div className={styles.content}>
            <div className={styles.title}>
              <h1>Meus Contratos</h1>
              <Filter />
            </div>
            <div className={styles.cardsWrapper}>
              <div className={styles.cardsContainer}>
                {data.map((card) => {
                  if (card != null) {
                    
                    const cardIndex = data.indexOf(card);
                    return (
                      <BoughtBuildingCard
                        image={card._realtyData.images[0]}
                        streetAddress={card._realtyData.streetAddress}
                        neighborhood={card._realtyData.neighborhood}
                        state={card._realtyData.state}
                        setModalOpen={setModalOpen}
                        setModalId={setModalId}
                        id={cardIndex}
                        // startDate={"2023-01-01"}
                        // endDate={"2024-12-31"}
                      />
                    );
                  }
                })}

                {/* <BoughtBuildingCard
                  image={
                    "https://classic.exame.com/wp-content/uploads/2017/09/apto-decorado-even1.jpg?quality=70&strip=info&w=1000"
                  }
                  streetAddresss={"Alameda São Joao, 10101"}
                  neighborhoods={"Moema"}
                  state={"São Paulo"}
                  // setModalOpen={setModalOpen}
                  // setModalId={setModalId}
                  startDate={"2023-01-01"}
                  endDate={"2024-12-31"}
                />
                <BoughtBuildingCard
                  image={
                    "https://classic.exame.com/wp-content/uploads/2020/09/Apartamento-compacto-incorporadora-You-Inc-mercado-imobiliario.jpg?quality=70&strip=info&w=1024"
                  }
                  streetAddresss={"Rua correa de santos, 198"}
                  neighborhoods={"Butantã"}
                  state={"São Paulo"}
                  // setModalOpen={setModalOpen}
                  // setModalId={setModalId}
                  startDate={"2023-01-01"}
                  endDate={"2025-12-31"}
                /> */}
              </div>
              {modalOpen ? (
                <SaleModal
                  streetAddress={data[modalId]._realtyData.streetAddress}
                  image={data[modalId]._realtyData.images[0]}
                  neighborhood={data[modalId]._realtyData.neighborhood}
                  state={data[modalId]._realtyData.state}
                  id={data[modalId]._realtyData.id}
                  // startDate={data[modalId]._realtyData.startDate}
                  // endDate={data[modalId]._realtyData.endDate}
                  setModalOpen={setModalOpen}
                />
              ) : null}
            </div>
          </div>

          <Footer />
        </>
      ) : (
        "carregando"
      )}
    </>
  );
}


export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: session,
  };
}


export default myContracts;

// export const getStaticProps = async () => {
//   let data ={}

//   if (typeof window !== "undefined") {
//     const userId = JSON.parse(localStorage.userData).id;

//     data = fetch(`http://127.0.0.1:8000/api/v1/users/${userId}`)
//       .then((response) => response.json())
//       .then((json) => {
//         console.log(json);
//       });
//   }
//   return {
//     props: {
//       data,
//     },
//     revalidate: 60 * 5,
//   };
// };
