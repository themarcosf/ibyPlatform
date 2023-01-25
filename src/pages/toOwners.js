import Head from "next/head";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import NoContent from "../components/NoContent/NoContent";

// import styles from "../styles/toOwners.module.scss";

function pj() {
  return (
    <>
      <Head>
        <title>Iby Platform | Para proprietários</title>
      </Head>
      <Header />
      <NoContent page={"dev"} />
      <Footer />
    </>
  );
}

export default pj;
