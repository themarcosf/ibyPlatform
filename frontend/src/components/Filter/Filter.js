import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import FilterModal from "../FilterModal/FilterModal";

import styles from "./Filter.module.scss";

function Filter() {
  const [openModal, setOpenModal] = useState(false);

  function filterHandler() {
    toast.loading("Feature em desenvolvimento", {
      duration: 3000,
      position: "bottom-right",
    });
  }

  return (
    <div className={styles.filters}>
      <button onClick={filterHandler}>
        <img src="/filter.png" />
        <p>Filtros</p>
      </button>
      {openModal && <FilterModal closeModal={setOpenModal} />}
      <Toaster />
    </div>
  );
}

export default Filter;
