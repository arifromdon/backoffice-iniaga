import { AppProps } from "next/app";
import "../global/global.css";
import Head from "next/head";
import NProgress from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css"; //styles of nprogress
import { useEffect, useState } from "react";
import UAParser from "ua-parser-js";
import {
  handleIsMobileDevice,
  useHandleIsMobileDevice,
} from "../redux/general.reducer";
import { LOCALSTORAGE } from "../src/contants/localstorage";
import AdminLayout from "./admin-area/Layout";
import config from "../src/config/config";

function MyApp({ Component, pageProps, router }: AppProps) {
  // Set up NProgress
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });
  Router.events.on("routeChangeError", () => NProgress.done());
  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();
    const deviceType = result.device.type;
    handleIsMobileDevice(deviceType === "mobile");
    localStorage.setItem(
      LOCALSTORAGE.ISMOBILE,
      deviceType === "mobile" ? "1" : "0"
    );
  }, []);

  // **Perbaikan kode di sini**
  const path = router.pathname.split("/") || "";
  const isPageLogin = router.pathname.startsWith("/login");

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="titla, meta, nextjs" />
        <meta name="author" content="Syamlal CM" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={config.favicon} />
        <title>{path?.[2] || path?.[1]}</title>
        <script src="https://cdn.ckeditor.com/4.22.1/standard/ckeditor.js"></script>
      </Head>
    
      {isPageLogin ? (
        <Component {...pageProps} />
      ) : (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      )}
    </div>
  );
}

export default MyApp;
