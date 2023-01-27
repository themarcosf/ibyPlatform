import Link from "next/link";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.row}>
        <div className={styles.imgBx}>
          <Link href={`/`}>
            <img src="/platform_white.png"></img>
          </Link>
        </div>
        <div className={styles.links}>
          <p>Mapa do site</p>
          <li>
            <Link href={"/"}>Início</Link>
          </li>
          <li>
            <Link href={"/toRent"}>Imóveis para alugar</Link>
          </li>
          <li>
            <Link href={"/toOwners"}>Para proprietários</Link>
          </li>
          <li>
            <Link href={"#"}>Quem somos</Link>
          </li>
        </div>
      </div>

      <div className={styles.copyRight}>
        <hr />
        <p>
          Copyright 2023 &copy; Por 3A1,5M Ltda. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}

export default Footer;
