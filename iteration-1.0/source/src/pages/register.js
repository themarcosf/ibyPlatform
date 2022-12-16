import Link from "next/link";
import Image from "next/image";
import Router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Card from "../components/Card/Card";
import Header from "../components/Header/Header";

import styles from "../styles/register.module.scss";

function register() {
  const [pf, setPf] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userRegister = (data) => {
    fetch(`http://127.0.0.1:8000/api/v1/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .then(() => {
        Router.push("/");
      });
  };

  return (
    <>
      <Header>
        <Image src="/gov_logo.svg" width={89} height={32} alt="gov_logo" />
        <a
          target={"_blank"}
          href={"https://www.gov.br/governodigital/pt-br/vlibras"}
        >
          <strong>VLibras</strong>
        </a>
      </Header>
      <div className={styles.registerContent}>
        <h1>Cadastre-se</h1>
        <div className={styles.registerCard}>
          <div className={styles.btnsContainer}>
            <a
              onClick={() => setPf(true)}
              className={pf ? styles.active : styles.disable}
            >
              Pessoa Física
            </a>
            <a
              onClick={() => setPf(false)}
              className={!pf ? styles.active : styles.disable}
            >
              Pessoa Jurídica
            </a>
          </div>

          <form className={styles.form} onSubmit={handleSubmit(userRegister)}>
            <div className={styles.fields}>
              <label>{pf ? "Nome" : "Razão Social"}</label>
              <input
                placeholder={pf ? "Nome" : "Razão Social"}
                type="text"
                name={pf ? "Nome" : "Razão Social"}
                {...register("name")}
              />
            </div>
            <div className={styles.fields}>
              <label>Email</label>
              <input
                placeholder={"Email"}
                type="text"
                name={"Email"}
                {...register("email")}
              />
            </div>

            <div className={styles.fields}>
              <label>{pf ? "CPF" : "CNPJ"}</label>
              <input
                placeholder={pf ? "CPF" : "CNPJ"}
                type="number"
                name={"officialId"}
                {...register("officialId")}
              />
            </div>

            <div className={styles.fields}>
              <label>Senha</label>
              <input
                placeholder="Digite sua senha"
                type="text"
                name="password"
                {...register("password")}
              />
            </div>
            <div className={styles.fields}>
              <label>Digite sua carteira</label>
              <input
                placeholder="Digite sua carteira"
                type="text"
                name="wallet"
                {...register("wallet")}
              />
            </div>

            <div className={styles.sendBtn}>
              <button type="submit">Continuar</button>
              {/* Redirecionar para / poup up */}
            </div>
          </form>

          <p>
            Já tem cadastro? Faça{" "}
            <span style={{ fontWeight: 600 }}>
              <Link href={"/"}>Login</Link>{" "}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default register;
