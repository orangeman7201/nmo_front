import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Footer: React.FC = () => {
  const router = useRouter();
  
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg py-2">
      <div className="container mx-auto">
        <div className="flex justify-around items-center">
          <Link href="/conditions" className={`flex flex-col items-center p-2 ${router.pathname.includes('/conditions') ? 'text-blue-500' : 'text-gray-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">ホーム</span>
          </Link>
          <Link href="/reports" className={`flex flex-col items-center p-2 ${router.pathname.includes('/reports') ? 'text-blue-500' : 'text-gray-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs mt-1">レポート</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
