'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EngravingsRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/shirt-prints');
  }, [router]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p>Redirecting to shirt prints...</p>
    </div>
  );
}
