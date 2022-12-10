import styles from "./EsgPractice.module.scss";

function EsgPractice() {
  return (
    <>
    <div className={styles.container}>
      <div>
        <img src="./doacao.png"></img>
        <p className={styles.number}>1°</p>
        <p>Assinalar a opção ESG</p>
      </div>
      <div>
        <img  style={{width:"150px"}} src="./setas.png"></img>
        <p className={styles.number}>2°</p>
        <p >O governo irá doar<br/>uma quantia igual</p>
      </div>
      <div>
        <img style={{marginLeft:"40px"}} src="./planeta_terra.png"></img>
        <p className={styles.number}>3°</p>
        <p >Esse valor será direcionado<br/> para o fundo voltado a ESG</p>
      </div>
    </div>
    </>
  );
}

export default EsgPractice;
