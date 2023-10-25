// 변수 선언
let backendHost;

// 현재 호스트명을 가져오기 위해 window 객체와 window.location 객체를 사용
const hostname = window && window.location && window.location.hostname;

// 만약 현재 호스트명이 "localhost"라면
if (hostname === "localhost") {
  // 백엔드 호스트를 지정된 주소로 설정
  backendHost = "http://localhost:8888";
}

// API의 기본 URL을 백엔드 호스트로 설정된 값으로 결합하여 정의
export const API_BASE_URL = `${backendHost}`;
