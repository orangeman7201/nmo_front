import { Inter } from "next/font/google";
import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <div>トップ画面です</div>
      <Link href="/conditions">体調一覧</Link>
    </div>
  );
}
