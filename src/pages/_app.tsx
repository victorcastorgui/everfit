import { store } from "@/stores/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Layout from "./layout";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Toaster richColors position="top-center" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
