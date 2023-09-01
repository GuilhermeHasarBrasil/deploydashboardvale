import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <script type="text/javascript" src="/zebra/BrowserPrint.js" async></script>
      <script type="text/javascript" src="/zebra/BrowserPrint-Zebra.js" async></script>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
