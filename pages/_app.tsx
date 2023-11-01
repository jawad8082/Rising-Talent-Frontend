//@ts-nocheck
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ToastContainer />
        </QueryClientProvider>
      </Layout>
    </Provider>
  );
}

export default MyApp;
