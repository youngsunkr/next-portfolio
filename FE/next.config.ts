import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 개발 환경에서 외부 접속(모바일 테스트 등)을 허용할 IP 주소 등록
  allowedDevOrigins: ['192.168.200.194', 'localhost:3000'],
};

export default nextConfig;
