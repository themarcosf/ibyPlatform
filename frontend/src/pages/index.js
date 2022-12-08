import Image from "next/image";
import Router from 'next/router'
import { useForm } from "react-hook-form";

import Card from "../components/Card/Card";
import Header from "../components/Header/Header";

import styles from "./login.module.scss";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const login = (data) => {
    if(data.CPF == 17097167700 && data.password == 123456){
      Router.push('/pf')
    }
  }

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
      <div className={styles.loginContent}>
        <div className={styles.imgContainer}>
          <h1>
            Cuide do que realmente <br />
            importa para você
          </h1>
          <div className={styles.imgBx}>
            <img src="/family.png" alt="family" />
          </div>
        </div>
        <Card>
          <div className={styles.wrapper}>
            <h1>Identifique-se no gov.com:</h1>
            <p>Número do CPF</p>
            <p>Digite seu CPF para criar ou acessar sua conta gov.br</p>

            <form onSubmit={handleSubmit(login)}>
              <div className={styles.fields}>
                <label>CPF</label>
                <input placeholder="Digite seu CPF" type="text" name="CPF" {...register("CPF")} />
              </div>

              <div className={styles.fields}>
                <label>Senha</label>
                <input placeholder="Digite sua senha" type="text" name="password" {...register("password")} />
              </div>

              <div className={styles.btnContainer}>
                <button type="submit">Continuar</button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
}
