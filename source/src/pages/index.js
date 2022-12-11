import Image from "next/image";
import Link from "next/link";
import Router from 'next/router'
import { useForm } from "react-hook-form";

import Card from "../components/Card/Card";
import Header from "../components/Header/Header";

import styles from "../styles/login.module.scss";

export default function home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const login = (data) => {
    const loginData = {
      officialId: parseInt(data.officialId),
      password: data.password
    }

    fetch(`http://127.0.0.1:8000/api/v1/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        localStorage.setItem("userData", JSON.stringify(json.data.currentUser))
        // console.log(localStorage)
      })
      .then(() => {
        Router.push("/home");
      });
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
            <p>Digite seu CPF ou CNPJ para criar ou acessar<br/> sua conta gov.br</p>

            <form onSubmit={handleSubmit(login)}>
              <div className={styles.fields}>
                <label>CPF/CNPJ</label>
                <input placeholder="Digite seu CPF ou CNPJ" type="number" name="officialId" {...register("officialId")} />
              </div>

              <div className={styles.fields}>
                <label>Senha</label>
                <input placeholder="Digite sua senha" type="text" name="password" {...register("password")} />
              </div>

              <div className={styles.btnContainer}>
                <button type="submit">Continuar</button>
              </div>
            </form>
            <p className={styles.register}>Não tem uma conta ainda? <Link href={'/register'}>Registre-se</Link></p>
          </div>
        </Card>
      </div>
    </>
  );
}
