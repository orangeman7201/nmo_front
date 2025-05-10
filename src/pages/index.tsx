import { Inter } from "next/font/google";
import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <div className="mb-8">トップ画面です</div>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <Link href="/conditions" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">体調一覧</Link>
        <Link href="/reports" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">来院レポート一覧</Link>
      </div>
    </div>
  );
}
