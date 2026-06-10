import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 개발 환경에서 외부 접속(모바일 테스트 등)을 허용할 IP 주소 등록
  allowedDevOrigins: ['192.168.200.194', 'localhost:3000'],
  reactStrictMode: true,
  images: {
    // domains: [
    //   'www.notion.so', 
    //   'images.unsplash.com', 
    //   'www.gscaltex.com', 
    //   'www.kbinsure.co.kr', 
    //   'www.modetournetwork.com', 
    //   'www.korloy.com', 
    //   'www.lgensol.com'],
    
    //  최신 방식 (보안 강화)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.modetournetwork.com',
        port: '',
        pathname: '/**', // 해당 도메인의 모든 경로 허용
      },
      {
        protocol: 'https',
        hostname: 'www.kbinsure.co.kr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.gscaltex.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.korloy.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.lgensol.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
};

export default nextConfig;
