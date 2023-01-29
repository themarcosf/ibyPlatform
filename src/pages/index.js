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
              Nossa solução busca facilitar o aluguel de imóveis por prazos mais
              longos para pessoas que desejam qualidade e tranquilidade para
              deixar a sua casa com a sua cara. Por meio da adoção da tecnologia
              de blockchain, o direito de residência é assegurado por meio da
              venda de tokens e possui garantia de imutabilidade e
              rastreabilidade, tornando possível a sua revenda. Dessa forma,
              acreditamos que podemos gerar valor através da implementação de
              uma plataforma de revenda de tokens e mecanismos de liquidez que
              proporcionem ao nosso cliente a possibilidade de participar da
              valorização imobiliária durante o período contratado.
            </p>
            <h2>Qual o nosso objetivo?</h2>
            <p>
              Nosso objetivo é tornar possível que mais pessoas possam morar com
              a qualidade de um imóvel próprio em um imóvel alugado. Acreditamos
              que os gastos com reformas e aquisição de mobília são altos quando
              comparados com prazos contratuais de 30 meses e acaba resultando
              em condições de moradia sub ótimas. A Iby quer trazer mais
              praticidade para a vida do cliente, eliminando as burocracias
              tradicionais como contratação de seguro fiança, boleto de
              condomínio, IPTU, seguro incêndio, dentre outras. Compre o token,
              more do seu jeito e mude se quiser. Ou não.
            </p>
          </div>
          <div
            style={{
              width: "40%",
              marginRight: "4rem",
              position: "relative",
              left: "3%",
              display: "flex",
              alignItems: "center",
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
            <div className={styles.stepBx}>
              <h3>1° Passo</h3>
              <p>
                Acesse a página de imóveis disponíveis e confira os detalhes dos
                que você mais gostar. Lembre de favoritar os imóveis que mais
                gostar, para facilitar sua decisão. Assim que encontrar um
                imóvel com a sua cara, clique para ter uma descrição mais
                detalhada, visualizar as fotos e agendar uma visita. Caso goste
                da proposta oferecida e o preço faça sentido para você, faça o
                seu lance ou garanta o imóvel pelo preço de arremate.
              </p>
            </div>
            <div
              style={{
                width: "30%",
                position: "relative",
                left: "3%",
              }}
            >
              <Lottie animationData={BlueHouse} />
            </div>
          </div>
          <div className={styles.steps}>
            <div
              style={{
                width: "25%",
                position: "relative",
                left: "1%",
                marginRight: "100px",
                margin: "2rem 100px 2rem 0",
              }}
            >
              <Lottie animationData={Nft} />
            </div>
            <div className={styles.stepBx}>
              <h3>2° Passo</h3>
              <p style={{ textAlign: "end" }}>
                Se você ainda não tiver um perfil na plataforma, não tem
                problema. Pensando na sua segurança, você será redirecionado
                para realizar seu login com sua conta do Google. É seguro, fácil
                e após isso você poderá confirmar seus dados cadastrais, que
                serão submetidos a uma análise de crédito rápida e simples. Se o
                seu lance for o vencedor, o token será enviado automaticamente
                para sua carteira.
              </p>
            </div>
          </div>
          <div className={styles.steps}>
            <div className={styles.stepBx}>
              <h3>3° Passo</h3>
              <p>
                Pronto! Agora é só pensar em deixar o seu cantinho pronto para
                receber os amigos, família e quem mais você quiser. Aproveite
                todos os benefícios e deixe que a Iby cuida do resto, inclusive
                pagamento de condomínio, IPTU e seguro incêndio – nenhuma taxa
                extra. E, se em algum momento, você precisar se mudar ou desejar
                explorar o mundo, lembre que pode colocar seu token para revenda
                na nossa plataforma. Vamos juntos!
              </p>
            </div>
            <div
              style={{
                width: "35%",
                position: "relative",
                left: "3%",
                marginBottom: "3rem",
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
