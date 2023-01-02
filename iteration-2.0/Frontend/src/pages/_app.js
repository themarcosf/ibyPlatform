import { useSession } from "next-auth/react";
import ProvidersWrapper from "../components/ProvidersWrapper/ProvidersWrapper";

import "../styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <ProvidersWrapper>
      <Component {...pageProps} />
    </ProvidersWrapper>
  );
}
