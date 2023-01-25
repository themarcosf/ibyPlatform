import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.row}>
        <div className={styles.imgBx}>
          <img src="/platform_white.png"></img>
          <p>Contact Us</p>
          <input placeholder="How we can help you?"></input>
          <button>Send</button>
        </div>
        <div className={styles.links}>
          <p>About IbyPlatform</p>
          <li>Partner with Us</li>
          <li>Terms & Conditions</li>
          <li>Cookie Statement</li>
          <li>Privacy Statement</li>
        </div>
      </div>

      <div className={styles.copyRight}>
        <hr />
        <p>
          Copyright 2023 &copy; Por 3A1,5M Ltda. Todos os direitos reservados.
          HEROKU
        </p>
      </div>
    </div>
  );
}

export default Footer;
