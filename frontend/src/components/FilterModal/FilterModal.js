import styles from "../FilterModal/FilterModal.module.scss";

function FilterModal({ closeModal }) {
  return (
    <>
      <div className={styles.modalBackground}>
        <div className={styles.modalContainer}>
          <div className={styles.titleAlign}>
            <div className={styles.title}>
              <button
                onClick={() => {
                  closeModal(false);
                }}
              >
                X
              </button>
            </div>
          <div className={styles.title}>
            <h1>Localização</h1>
          </div>
          </div>
          
          <div className={styles.body}>
            <div className={styles.sec}>
                <h3>Estado</h3>
            <p>Selecione o Estado que deseja:</p>
            </div>
            <h3>Cidade</h3>
            <p>Selecione a cidade que deseja:</p>
            <h3>Bairro</h3>
            <p>Selecione o bairro que deseja:</p>
          </div>
          <div className={styles.footer}>
            <button>Aplicar Filtros</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterModal;
