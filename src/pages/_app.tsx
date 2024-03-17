import "@/styles/globals.css";
// ↓増えてきたらindexで整理する
import "@/styles/calendar.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
