import Lottie from "lottie-react";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import trophy from "../../public/trophy-lottie.json";

import styles from "../styles/whoWeAre.module.scss";

function whoWeAre() {
  return (
    <>
      <Header />
      <div className={styles.wrapperContainer}>
        <div className={styles.content}>
          <div className={styles.texts}>
            <h1>Quem Somos</h1>
            <p>
              A Iby surgiu no começo de dezembro de 2022 durante a participação
              em um hackathon promovido pela Secretária do Patrimônio da União,
              no qual fomos premiados no Desafio “Destinação dos bens da União”
              pela nossa proposta de alienação dos imóveis por meio de NFT com
              registro imobiliário e garantia de legitimidade por parte da
              União. Essa proposta permitia que tais imóveis fossem
              posteriormente comercializados sem a necessidade de trâmites
              cartoriais.
            </p>
            <p>
              Passado o hackathon, decidimos prosseguir com o desenvolvimento da
              plataforma, redirecionando o público alvo para imóveis privados e
              o foco para locações de longo prazo com a possibilidade de revenda
              de tokens, de modo a permitir que os clientes possam participar da
              valorização imobiliária ao longo do período contratual,
              adicionando uma característica de “investimento” ao que
              normalmente é visto apenas como “despesa” para a maioria das
              pessoas. Acreditamos que nossa proposta traga benefícios e gere
              valor tanto para o comprador do token quando para o proprietário
              do imóvel, que pode obter liquidez significativa sem precisar
              alienar sua propriedade.
            </p>
          </div>
          <Lottie className={styles.lottie} animationData={trophy} />
        </div>
        <div className={styles.ourTeamWrapper}>
          <h1>Nosso Time</h1>
          <div className={styles.content}>
            <div className={styles.memberBx}>
              <div className={styles.imgBx}>
                <img src="/members/bianca.jpeg" alt="member_picture" />
              </div>
              <strong>Bianca Cassemiro</strong>
              <div className={styles.memberBio}>
                <p>
                  Atualmente estou cursando Engenharia da Computação. Acabei de
                  sair do ensino médio, mas não é por isso que não tenho
                  história pra contar, gosto de gatinhos, assistir animes,
                  viajar e lutar jiu-jitsu(inclusive já fui
                  campeã brasileira). 🥋
                </p>
              </div>
              <div className={styles.links}>
                <a
                  target={"_blank"}
                  href="https://www.linkedin.com/in/bianca-cassemiro/"
                >
                  <AiFillLinkedin />
                </a>
                <a target={"_blank"} href="https://github.com/Bianca-Cassemiro">
                  <AiFillGithub />
                </a>
              </div>
            </div>
            <div className={styles.memberBx}>
              <div className={styles.imgBx}>
                <img src="/members/kathlyn.jpeg" alt="member_picture" />
              </div>
              <strong>Kathlyn Diwan</strong>
              <div className={styles.memberBio}>
                <p>
                  Adoro me comunicar e sou extrovertida, empreendedora nata e
                  tenho interesse em negócios e tecnologia. Gosto de viajar e
                  conhecer novas culturas. Estou sempre procurando novas
                  oportunidades para aprender e crescer e acredito que a vida é
                  uma jornada. ✨
                </p>
              </div>
              <div className={styles.links}>
                <a
                  target={"_blank"}
                  href="https://www.linkedin.com/in/kathlyn-diwan-0a0189232"
                >
                  <AiFillLinkedin />
                </a>
                <a target={"_blank"} href="https://github.com/KathlynDiwan">
                  <AiFillGithub />
                </a>
              </div>
            </div>
            <div className={styles.memberBx}>
              <div className={styles.imgBx}>
                <img src="/members/luiz.jpeg" alt="member_picture" />
              </div>
              <strong>Luiz Alencar</strong>
              <div className={styles.memberBio}>
                <p>
                  Estou cursando Engenharia de Software no INTELI. Desde pequeno
                  gosto de praticar esportes, como futebol, corrida e taekwondo.
                  Além disso, sempre fui muito curioso, o que me levou a
                  desenvolver o gosto pela leitura e depois pela cultura geek.⚡
                </p>
              </div>
              <div className={styles.links}>
                <a
                  target={"_blank"}
                  href="https://www.linkedin.com/in/luiz-k-alencar/"
                >
                  <AiFillLinkedin />
                </a>
                <a target={"_blank"} href="https://github.com/luiz-k-alencar">
                  <AiFillGithub />
                </a>
              </div>
            </div>
            <div className={styles.memberBx}>
              <div className={styles.imgBx}>
                <img src="/members/marcos.jpeg" alt="member_picture" />
              </div>
              <strong>Marcos Florencio</strong>
              <div className={styles.memberBio}>
                <p>
                  Sou formado em administração e estudo engenharia de software.
                  Tenho experiência em investimentos e mercados de capitais e
                  interesse por startups, inovação e tecnologia. Troquei o Excel
                  pelo VS Code e não me arrependo. Gosto de video games da série
                  Souls. 🕹️
                </p>
              </div>
              <div className={styles.links}>
                <a
                  target={"_blank"}
                  href="https://www.linkedin.com/in/marcos-florencio-ds/"
                >
                  <AiFillLinkedin />
                </a>
                <a target={"_blank"} href="https://github.com/themarcosf">
                  <AiFillGithub />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default whoWeAre;
