import ProvidersWrapper from "../components/ProvidersWrapper/ProvidersWrapper";
import { isSafari } from "react-device-detect";
import toast, { Toaster } from "react-hot-toast";

import "../styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <ProvidersWrapper>
      {isSafari &&
        toast.loading("Plataforma em desenvolvimento. Para uma melhor experiência, use o navegador Chromer.", {
          duration: 3000,
          position: "top-center",
        })}
      <Component {...pageProps} />
      <Toaster />
    </ProvidersWrapper>
  );
}
