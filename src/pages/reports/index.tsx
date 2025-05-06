import { Inter } from "next/font/google";
import Link from 'next/link';
import React from 'react';

const inter = Inter({ subsets: ["latin"] });

export default function Reports() {
  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">レポート</h1>
      <p className="mb-4">このページは現在開発中です。</p>
      <Link href="/conditions" className="text-blue-500 hover:underline">
        体調一覧に戻る
      </Link>
    </div>
  );
}
