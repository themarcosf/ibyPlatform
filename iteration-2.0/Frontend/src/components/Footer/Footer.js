import styles from "./Footer.module.scss";

function Footer() {
  const digitalTransformLink =
    "https://www.gov.br/governodigital/pt-br/transformacao-digital/";

    const EGD2020 = "https://www.gov.br/governodigital/pt-br/EGD2020";
    const SISP = "https://www.gov.br/governodigital/pt-br/sisp";

  return (
    <div className={styles.footerContainer}>
      <div className={styles.imgBx}>
        <img src="/gov_logo_branca.png"></img>
      </div>
      <div className={styles.linksContainer}>
        <div>
          <h1>
            <a
              target={"_blank"}
              href={`${digitalTransformLink}/`}
            >
              TRANSFORMAÇÃO DIGITAL
            </a>
          </h1>
          <ul>
            <li>
              <a
                target={"_blank"}
                href={`https://www.gov.br/governodigital/pt-br/legislacao/legislacao-governanca-digital`}
              >
                Legislação
              </a>
            </li>
            <li>
              <a target={"_blank"} href={`${digitalTransformLink}/trajetória-da-transformação-digital`}>
                Trajetória da transformação digital
              </a>
            </li>
            <li>
              <a target={"_blank"} href={`${digitalTransformLink}/quer-transformar-seu-serviço`}>
                Quer transformar seu serviço?
              </a>
            </li>
            <li>
              <a target={"_blank"} href={`${digitalTransformLink}/ferramentas`}>
                Ferramentas
              </a>
            </li>
            <li>
              <a target={"_blank"} href={`${digitalTransformLink}/rede-nacional-de-governo-digital`}>
                Rede Nacional de Governo Digital
              </a>
            </li>
            <li>
              <a target={"_blank"} href={`${digitalTransformLink}/lista-serviços-digitais`}>
                Lista Serviços Digitais
              </a>
            </li>
            <li>
              <a target={"_blank"} href={`${digitalTransformLink}/planos-digitais`}>
                Planos Digitais
              </a>
            </li>
            <li>
              <a target={"_blank"} href={`${digitalTransformLink}/redes-internacionais-de-compartilhamento`}>
                Redes Internacionais de Compartilhamento
              </a>
            </li>
            <li>
              <a target={"_blank"} href={`${digitalTransformLink}/10passos`}>
                Guia: 10 passos para a transformação digital em estados e
                municípios
              </a>
            </li>
            <li>
              <a target={"_blank"} href={`${digitalTransformLink}/rede-federal-de-ensino`}>
                Rede Federal de Ensino
              </a>
            </li>
            <li>
              <a target={"_blank"} href={`${digitalTransformLink}/central-de-qualidade`}>
                Central de Qualidade
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h1>
            <a
              target={"_blank"}
              href={`${EGD2020}/`}
            >
              ESTRATÉGIA DE GOVERNO DIGITAL 2020-2022
            </a>
          </h1>
          <ul>
            <li>
              <a
                target={"_blank"}
                href={`https://www.gov.br/governodigital/pt-br/legislacao/legislacao-governanca-digital`}
              >
                Legislação
              </a>
            </li>
            <li><a target={"_blank"} href={`${EGD2020}`}>Estratégia de Governo Digital 2020-2022</a></li>
            <li><a target={"_blank"} href={`${EGD2020}/centrado-no-cidadao`}>Um governo centrado no cidadão</a></li>
            <li><a target={"_blank"} href={`${EGD2020}/integrado`}>Um governo integrado</a></li>
            <li><a target={"_blank"} href={`${EGD2020}/inteligente`}>Um governo inteligente</a></li>
            <li><a target={"_blank"} href={`${EGD2020}/confiavel`}>Um governo confiável</a></li>
            <li><a target={"_blank"} href={`${EGD2020}/transparente-e-aberto`}>Um-governo transparente e aberto</a></li>
            <li><a target={"_blank"} href={`${EGD2020}/eficiente`}>Um governo eficiente</a></li>
          </ul>
        </div>
        <div>
          <h1>
            <a
              target={"_blank"}
              href={`${SISP}/`}
            >
              SISP
            </a>
          </h1>
          <ul>
            <li>
              <a
                target={"_blank"}
                href={`https://www.gov.br/governodigital/pt-br/legislacao/legislacao-governanca-digital`}
              >
                Legislação
              </a>
            </li>
            <li><a target={"_blank"} href={`${SISP}/sobre-o-sisp`}>Sobre o SISP</a></li>
            <li><a target={"_blank"} href={`${SISP}/governanca-de-talentos`}>Governança de Talentos</a></li>
            <li><a target={"_blank"} href={`${SISP}/documentos`}>Documentos</a></li>
            <li><a target={"_blank"} href={`${SISP}/suporte`}>Suporte</a></li>
            <li><a target={"_blank"} href={`${SISP}/guia-do-gestor`}>Guia do Gestor</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
