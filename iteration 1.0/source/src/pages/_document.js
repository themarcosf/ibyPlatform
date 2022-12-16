import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocuments extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&family=Montserrat:wght@400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link
            rel="shortcut icon"
            href="/favicon.svg"
            type="image/png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
