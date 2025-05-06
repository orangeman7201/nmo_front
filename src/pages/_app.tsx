import "@/styles/globals.css";
// ↓増えてきたらindexで整理する
import "@/styles/calendar.scss";
import "@/styles/modal.scss";
import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isLoggedInPage = !router.pathname.includes('/auth/');
  
  return (
    <>
      <Component {...pageProps} />
      {isLoggedInPage && <Footer />}
    </>
  );
}
