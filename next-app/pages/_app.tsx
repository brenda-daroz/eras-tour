import React from "react";
import "../styles.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

// This default export is required in a new `pages/_app.js` file.
export default function MyApp<T extends React.PropsWithChildren>({
  Component,
  pageProps,
}: {
  Component: React.FC<T>;
  pageProps: T;
}) {
  return <Component {...pageProps} />;
}
