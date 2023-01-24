import Head from "next/head";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import NoRealty from "../components/NoRealty/NoRealty";

// import styles from "../styles/toOwners.module.scss";

function pj() {
  return (
    <>
      <Head>
        <title>Iby Platform | Para proprietários</title>
      </Head>
      <Header />
      <NoRealty />
      <Footer />
    </>
  );
}

export default pj;
