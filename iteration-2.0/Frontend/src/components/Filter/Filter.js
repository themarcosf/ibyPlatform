import styles from "./Filter.module.scss";
import FilterModal from "../FilterModal/FilterModal";
import { useState } from "react";

function Filter() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={styles.filters}>
      <button
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <div>
          <img src="/filter.png" />
        </div>{" "}
        <div>
          <p>Filtros</p>
        </div>
      </button>
      {openModal && <FilterModal closeModal={setOpenModal} />}
    </div>
  );
}

export default Filter;
