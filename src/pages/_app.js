import "@/styles/globals.css";
import "@/styles/map.css";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { createReactClient, LivepeerConfig, studioProvider } from "@livepeer/react";
import { ContractProvider } from "../context/ContractProvider";
import { UserProvider } from "../context/UserProvider";
import io from "socket.io-client";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
const { publicClient } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.POLYGON }),
    publicProvider(),
  ]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
});

const livepeerClient = createReactClient({
  provider: studioProvider({ apiKey: process.env.LIVEPEER }),
});

const socket = io.connect("http://localhost:4000");

export default function App({ Component, pageProps }) {
  // const navigate = useNavigate();

  useEffect(() => {
    // socket.on("streaming", (dataa) => {
    //   toast(`${dataa.streamName} is streaming live!`);
    //   setData(dataa);
    // });
    // async function getTotal() {
    //   console.log(contract);
    //   const res = await contract.getAccessTime(
    //     "0x1d595281352F8897cd2Cf2ca454c91871593EfA1"
    //   );
    //   console.log(res);
    // }
    // getTotal();
    return () => {};
  }, [socket]);
  return (
    <WagmiConfig config={wagmiConfig}>
        <LivepeerConfig client={livepeerClient}>
          <ContractProvider>
            <UserProvider>
              <Navbar />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              <Component {...pageProps} />
            </UserProvider>
          </ContractProvider>
        </LivepeerConfig>
    </WagmiConfig>
  );
}
