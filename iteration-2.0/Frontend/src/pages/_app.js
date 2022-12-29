import { useSession } from "next-auth/react";
import ProvidersWrapper from "../components/ProvidersWrapper/ProvidersWrapper";

import "../styles/globals.scss";

export async function verifyUser(email, name) {
  const response = await fetch("http://127.0.0.1:8000/api/v1/user", {
    method: "POST",
    body: JSON.stringify({
      username: name,
      email: email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

  const userData = response.data.user;

  return userData
}

export default function App({ Component, pageProps }) {
  return (
    <ProvidersWrapper>
      <Component {...pageProps} />
    </ProvidersWrapper>
  );
}
