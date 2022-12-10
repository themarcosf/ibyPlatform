import Header from "../../components/HeaderEspecial/Header";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./about.module.scss";
import Image from "next/image";
import Footer from "../../components/Footer/Footer";
import Planet from "../about/planet.json";
import House from "../about/isometric_house.json";
import Lottie from "lottie-react";
import EsgPractice from "../../components/EsgPractice/EsgPractice";

export default about;

function about({ data }) {
  return (
    <div className={styles.body}>
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
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>
            Conheça a <br />
            Plataforma Iby
          </h1>
          <h2>
            e encontre um lugar <br />
            para chamar de lar
          </h2>
        </div>
        <div className={styles.gradiente}>
          <img id="gradiente" src="/gradiente.png" />
        </div>
        <div className={styles.imgContainer}>
          <img id="family" src="/houseFamily.png" />
        </div>
      </div>
      <div className={styles.texts}>
        <h3>Como surgiu a Plataforma Iby?</h3>
        <p>
          A ideia surgiu quando vimos a possibilidade de criar algo inovador no
          mercado
          <br /> imobiliário, unindo a experiência de participar de leilões
          junto ao universo
          <br /> Web3. Foi assim que nasceu a IbyPlatform, que trás a
          possibilidade de comprar <br />
          imóveis e ganhar dinheiro, tudo isso em um só lugar.
        </p>
        <h3>Qual o nosso objetivo?</h3>
        <p>
          Nosso objetivo é fazer com que você compre ou alugue imóveis sem
          seguro
          <br /> fiança, sem taxas de entrada e com possibilidade de ganho na
          valorização do <br />
          seu token.
        </p>
      </div>
      <div className={styles.esg}>
        <div
          style={{
            width: "28%",
            marginTop: "2%",
            position: "relative",
            left: "3%",
          }}
        >
          <Lottie animationData={Planet} />
        </div>
        <div className={styles.esgTexts}>
          <h3>Iniciativas ESG</h3>
          <p>
            O ESG resume as melhores práticas de caráter ambiental,
            <br /> social e de governança (Environmental, Social,
            <br /> Governance) que as empresas devem seguir.
            <br />
            Trata-se de um tripé que sustenta as ações de um novo
            <br /> mercado, em que organizações, investidores e,
            <br /> sobretudo, consumidores estão mais preocupados com a<br />{" "}
            sustentabilidade e a responsabilidade social das marcas
            <br /> com as quais se relacionam.
          </p>
        </div>
      </div>
      <div className={styles.esgMessage}>
        <p>
          A IbyPlatform promove a prática do{" "}
          <span style={{ color: "#66A570", fontWeight: "bold" }}>ESG</span> no
          momento em que a pessoa realiza a compra de <br />
          algum imóvel. Ou seja, antes da realização da compra há a opção de
          pagar de 1 a 3% a mais <br />
          do valor do imóvel para promover as práticas ESG, deste modo o governo
          paga o mesmo <br />
          valor referente a doação.{" "}
        </p>
      </div>
      <p
        style={{
          color: "#66A570",
          fontWeight: "500",
          fontSize: "28px",
          marginTop: "40px",
          textAlign:"center"
        }}
      >
        Na prática
      </p>
      <EsgPractice/>
      <div className={styles.nftContainer}>
        <div>
            <h3>Ganhe um NFT <br/>especial</h3>
            <p>Quando você realiza uma ação no fundo de ESG <br/>promovido pelo Governo Federal, você recebe um <br/>NFT referente a esta doação. Essa NFT é exclusiva e <br/>tem um design diferente dos demais.</p>
            <h4 style={{color:"#66A570", marginTop:"40px", fontSize:"24px"}}>Faça a diferença, faça um Iby</h4>
        </div>
        <div  style={{
            width: "28%",
            marginTop: "1%",
            marginLeft:"20%",
            position: "relative",
            left: "3%",
          }}>
        <Lottie animationData={House} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
