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

  const login = (data) => {
    if (data.CPF == 17097167700 && data.password == 123456) {
      Router.push("/pf");
    }
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
        <Card>
          <div className={styles.wrapper}>
            <div className={styles.btnsContainer}>
              <a onClick={() => setPf(true)} className={styles.pfBtn}>
                Pessoa Física
              </a>
              <a onClick={() => setPf(false)} className={styles.pfBtn}>
                Pessoa Jurídica
              </a>
            </div>

            <form onSubmit={handleSubmit(login)}>
              <div className={styles.fields}>
                <label>{pf ? "Nome" : "Razão Social"}</label>
                <input
                  placeholder={pf ? "Nome" : "Razão Social"}
                  type="text"
                  name={pf ? "Nome" : "Razão Social"}
                  {...register("Nome/Razao_Social")}
                />
              </div>

              <div className={styles.fields}>
                <label>{pf ? "CPF" : "CNPJ"}</label>
                <input
                  placeholder={pf ? "CPF" : "CNPJ"}
                  type="text"
                  name={pf ? "CPF" : "CNPJ"}
                  {...register("CPF/CNPJ")}
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

              <div className={styles.btnContainer}>
                <button type="submit">Continuar</button>
              </div>
            </form>

            <p>
              Já tem cadastro? Faça{" "}
              <span>
                <Link href={"/"}></Link>{" "}
              </span>
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}

export default register;
