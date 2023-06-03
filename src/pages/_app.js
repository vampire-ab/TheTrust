import "@/styles/globals.css";
import "@/styles/map.css";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import {
  createReactClient,
  LivepeerConfig,
  studioProvider,
} from "@livepeer/react";
import { ContractProvider } from "../context/ContractProvider";
import { UserProvider } from "../context/UserProvider";
// import io from "socket.io-client";
// import { useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";
const { publicClient } = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_POLYGON }), publicProvider()]
);
// let socket;
const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
});

const livepeerClient = createReactClient({
  provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_LIVEPEER }),
});
export default function App({ Component, pageProps }) {
  // async function socketInitializer() {
  //   await fetch("/api/socket");

  //   socket = io();

  //   socket.on("receive-message", (data) => {
  //     console.log("Message received", data);
  //   });
  // }
  // useEffect(() => {
  //   socketInitializer();
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  // function handleSubmit(e) {
  //   e.preventDefault();

  //   console.log("emitted");

  //   socket.emit("send-message", {
  //     h: "11222",
  //     k: "jhuehi",
  //   });
  // }
  return (
    <WagmiConfig config={wagmiConfig}>
      <LivepeerConfig client={livepeerClient}>
        <ContractProvider>
          <UserProvider>            
            <Navbar />
            {/* <Link href={{ pathname: "/watch-stream" }}> */}
              {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              /> */}
            {/* </Link> */}
            <Component {...pageProps} />
          </UserProvider>
        </ContractProvider>
      </LivepeerConfig>
    </WagmiConfig>
  );
}
