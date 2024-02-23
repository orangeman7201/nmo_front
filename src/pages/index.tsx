import { Inter } from "next/font/google";
import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <div className="mb-8">トップ画面です</div>
      <Link href="/conditions" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">体調一覧</Link>
    </div>
  );
}
