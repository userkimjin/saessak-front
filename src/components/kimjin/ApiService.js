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

  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken != null) {
    options.headers.append("Authorization", "Bearer " + accessToken);
  }

  // 요청 데이터가 주어진 경우, 요청 본문에 JSON 형식으로 변환하여 추가합니다.
  if (request) {
    options.body = JSON.stringify(request);
  }

  return fetch(options.url, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => {
          if (data.token) {
            console.log("data1 ======>", data);
            // 로그인에 성공했을 때 마이페이지로 이동
            window.location.href = "/user/mypage";
          } else {
            console.log("data2 ======>", data);
            // 토큰이 없는 경우 메인 페이지로 이동
          }
          return data;
        });
      } else if (response.status === 403) {
        // 403 상태 코드가 반환되면 로그인 페이지로 이동
        window.location.href = "/login";
      } else {
        throw Error(response);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// export function signin(memberDto) {
//   return call("/auth/signin", "POST", memberDto).then((response) => {
//     console.log("response : ", response);
//     alert("로그인 토큰 : " + response.token);
//   });
// }
