'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function DarkModeToggleButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // 💡 컴포넌트가 브라우저에 마운트(렌더링) 완료된 시점을 추적
  useEffect(() => {
    setMounted(true);
  }, []);

  // 마운트되기 전에는 서버와 클라이언트의 미스매치를 방지하기 위해 빈 버튼이나 기본 스켈레톤 노출
  if (!mounted) {
    return <div className="w-24 h-8 bg-gray-200 animate-pulse rounded" />;
  }

  return (
    <button 
      className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}