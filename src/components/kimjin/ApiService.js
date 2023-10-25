// "API_BASE_URL" 상수를 가져오기 위해 "api-config" 모듈을 가져옵니다.
import { API_BASE_URL } from "./api-config";

// HTTP 요청을 만들고 보낼 함수를 정의합니다.
export function call(api, method, request) {
  // HTTP 요청에 필요한 설정 옵션을 담는 객체를 초기화합니다.
  let options = {
    // 요청 헤더를 설정합니다. 이 경우, JSON 형식의 데이터를 보내는 것을 명시합니다.
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    // 요청 URL을 구성합니다. API 엔드포인트를 "API_BASE_URL"에 추가합니다.
    url: API_BASE_URL + api,
    // HTTP 요청 메서드를 설정합니다 (GET, POST, PUT, DELETE 등).
    method: method,
  };

  // 요청 데이터가 주어진 경우, 요청 본문에 JSON 형식으로 변환하여 추가합니다.
  if (request) {
    options.body = JSON.stringify(request);
  }

  // Fetch API를 사용하여 HTTP 요청을 보내고, 응답을 처리합니다.
  // HTTP 요청을 보내는 fetch 함수를 호출하고 응답을 처리하는 Promise를 반환
  return (
    fetch(options.url, options)
      // 응답을 받으면 다음 함수를 실행
      .then((response) => {
        // 만약 응답 상태 코드가 200이면
        if (response.status === 200) {
          // JSON 형식으로 변환하여 반환
          return response.json();
        }
        // 응답 상태 코드가 403이면
        else if (response.status === 403) {
          // 로그인 페이지로 이동
          window.location.href = "/login";
        }
        // 그 외의 상태 코드라면
        else {
          // 에러를 throw하여 예외를 발생시킴
          throw Error(response);
        }
        // JSON 형식으로 변환한 응답을 반환
        return response.json();
      })
      // 에러가 발생하면 다음 함수를 실행
      .catch((error) => {
        // 에러를 콘솔에 출력
        console.log(error);
      })
  );
}

export function signin(userDto) {
  return call("/auth/signin", "POST", userDto).then((response) => {
    console.log("response : ", response);
    alert("로그인 토큰 : " + response.token);
  });
}
