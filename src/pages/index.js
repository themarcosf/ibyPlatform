import Head from "next/head";
import Lottie from "lottie-react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import CarouselIndex from "../components/Carousel/Carousel";
import styles from "../styles/index.module.scss";
import blueNft from "../../public/blueNft.json";
import Video from "../components/Video/Video";
import BlueHouse from "../../public/blueHouse.json";
import Nft from "../../public/ntfTrf.json";
import Relax from "../../public/relax.json";

function Home() {
  return (
    <>
      <Head>
        <title>Iby Platform</title>
      </Head>
      <div className={styles.body}>
        <Header />
        <CarouselIndex />
        <div className={styles.firstInfo}>
          <div className={styles.texts}>
            <h2 id="howStarted">O que é a plataforma Iby?</h2>
            <p>
              Nossa solução busca facilitar o aluguel de imóveis através da
              transferência de NFTs por um determinado <br />
              período de tempo definido pelo dono do imóvel. Cada NFT dá direito
              ao uso semestral do imóvel a que faz <br />
              referência. Além disso, os tokens podem ser revendidos para
              pessoas físicas ou empresas que queiram <br />
              alugar residências ou imóveis comerciais. Acreditamos que a
              principal proposta de valor da Iby esteja <br />
              intrinsecamente direcionada para indivíduos com interesse de
              permanência longa ou em ganhos com <br />
              a valorização dos imóveis. Como as NFTs possuem valor, as pessoas
              que as comprarem poderão observar <br />
              ganhos em seus investimentos no momento da revenda.
            </p>
            <h2>Qual o nosso objetivo?</h2>
            <p>
              Nosso objetivo é fazer com que você consiga adquirir o aluguel de
              um imóvel de maneira fácil <br /> intuitiva e automatizada,
              transformando sua participação em leilões em uma verdadeira
              experiência <br /> em Web3. Mais do que isso, a Iby quer trazer
              praticidade na alocação de imóveis, eliminando as <br />{" "}
              burocracias e seguros de fiança tradicionais, tornando o processo
              de aluguel mais simples e eficiente.
            </p>
          </div>
          <div
            style={{
              width: "28%",
              marginTop: "8%",
              position: "relative",
              left: "3%",
            }}
          >
            <Lottie animationData={blueNft} />
          </div>
        </div>
        <div id="video" className={styles.video}>
          <h2>Saiba mais sobre a Platforma Iby</h2>
          <Video />
        </div>
        <div className={styles.howItWorks}>
          <h2>Como a Iby funciona?</h2>
          <div className={styles.steps}>
            <div>
              <h3>1° Passo</h3>
              <p>
                Acesse nosso painel no qual apresenta todos imóveis <br />que  estão
                disponíveis para serem alugados. Você <br /> pode favoritar os
                imóveis que mais gostar.
                <br /> Clique em uma propriedade para ter uma <br /> descrição
                mais detalhada da mesma. Caso <br />
                goste da proposta oferecida, você pode fazer
                <br /> uma oferta.
              </p>
            </div>
            <div
              style={{
                width: "35%",
                position: "relative",
                left: "3%",
              }}
            >
              <Lottie animationData={BlueHouse} />
            </div>
          </div>
          <div className={styles.steps2}>
            <div
              style={{
                width: "25%",
                position: "relative",
                left: "1%",
                marginRight: "100px",
              }}
            >
              <Lottie animationData={Nft} />
            </div>
            <div>
              <h3>2° Passo</h3>
              <p>
                Se você ainda não tiver um perfil na plataforma,
                <br /> você será redirecionado para a um pequeno
                <br /> cadastro e após isso fará a confirmação da sua
                <br /> oferta. Se o seu lance for o vencedor os NFT’s <br />
                serão enviados automaticamente para sua <br />
                carteira.
              </p>
            </div>
          </div>
          <div className={styles.steps}>
            <div>
              <h3>3° Passo</h3>
              <p>
                Pronto! Agora é só aproveitar todos
                <br /> os benefícios que a Iby oferece. Desta forma, você <br />
                pode revender suas NFT’s por um determinado
                <br /> período de tempo escolhido para que deste
                <br /> modo as mesmas se valorizem.
              </p>
            </div>
            <div
              style={{
                width: "35%",
                position: "relative",
                left: "3%",
              }}
            >
              <Lottie animationData={Relax} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
