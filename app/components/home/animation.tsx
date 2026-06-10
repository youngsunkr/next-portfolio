'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import animationData from '@/public/animation.json'; // 404 프리 패스 경로

// 💡 핵심: 브라우저 전용 컴포넌트인 Player를 이 파일 내부에서 안전하게 꺼내옵니다.
const SafePlayer = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { 
    ssr: false, // 서버 사이드 렌더링에서 완전히 제외
    loading: () => <div style={{ width: '300px', height: '300px' }}>로딩 중...</div>
  }
);

export default function AnimationComponent() {
  return (
    <div style={{ width: '300px', height: '300px' }}>
      {/* 이제 SafePlayer는 안전한 클라이언트 컴포넌트이므로 에러 없이 정상 구동됩니다. */}
      <SafePlayer
        autoplay
        loop
        src={animationData}
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
}