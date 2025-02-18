"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const PackageList = dynamic(() => import("../../components/Package"), { ssr: false });

export default function Page() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {isReady ? <PackageList /> : <div>Loading...</div>}
    </div>
  );
}

