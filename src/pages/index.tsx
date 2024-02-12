import { Inter } from "next/font/google";
import { useEffect, useState } from 'react';
import Link from 'next/link'
import axios from '../plugins/axios';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [conditions, setConditions] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/conditions').then((response) => {
      setConditions(response.data);
    });
  }, [])

  // conditionsがnullの場合はnullを返却
  if (!conditions.length) return null;

  return (
    <div>
      <div>トップ画面です</div>
      <Link href="/conditions">体調一覧</Link>
    </div>
  );
}
