import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { call } from "./ApiService";

const Changing = () => {
  const editItem = (item) => {
    console.log("item입니다 ", item);
    call("/user/changing", "PUT", item)
      .then((response) => {
        console.log("Data updated successfully", response);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const onNickNameChange = (e) => {
    setNewNickName(e.target.value);
  };
  const onEmailChange = (e) => {
    setNewEmail(e.target.value);
  };
  const onPhoneChange = (e) => {
    setNewPhone(e.target.value);
  };
  const onPassWordChange = (e) => {
    setNew_pwd(e.target.value);
  };
  const onAddressChange = (e) => {
    setNewAddress(e.target.value);
  };
  const onNow_PswChange = (e) => {
    setNow_pwd(e.target.value);
  };
  const onNew_PswChange = (e) => {
    setNew_pwd_check(e.target.value);
  };

  // const onButtonClick = () => {
  //   const item = {
  //     id: "1",
  //     nickName: newNickName,
  //     email: newEmail,
  //     password: new_pwd,
  //     address: newAddress,
  //   };
  //   editItem(item);
  //   // movePage("/user/mypage");
  // };

  const [privacys, setPrivacys] = useState([]);

  useEffect(() => {
    call("/user/mypage", "GET", null).then((response) => {
      setPrivacys(response.data[0]);
      console.log("==========useEffect 잘 가져왔나", response);
    });
  }, []);

  const movePage = useNavigate();
  const [now_pwd, setNow_pwd] = useState("");
  const [new_pwd, setNew_pwd] = useState("");
  const [new_pwd_check, setNew_pwd_check] = useState("");
  const [newName, setNewName] = useState("");
  const [newNickName, setNewNickName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const pwdSubmit = (e) => {
    e.preventDefault();

    console.log("privacys.email ====> ", privacys.email);
    console.log("privacys.nickname ====> ", privacys.nickName);
    console.log("privacys.address ====> ", privacys.address);
    console.log("new_pwd ====> ", new_pwd);
    console.log("new_pwd_check ====> ", new_pwd_check);
    console.log("now_pwd ====> ", now_pwd);
    console.log("privecy ====> ", privacys.password);

    const email = privacys ? privacys.email : "";
    const nickName = privacys ? privacys.nickName : "";
    const address = privacys ? privacys.address : "";

    //이메일 입력안했을때
    if (newEmail === "") {
      setNewEmail(email);
    }

    //닉네임을 입력안했을때
    if (newNickName === "") {
      setNewNickName(nickName);
    }

    //주소를 적지않았을때
    if (newAddress === "") {
      setNewAddress(address);
    }

    //비밀번호가 틀렸을 때
    if (privacys.password !== now_pwd) {
      alert("현재 비밀번호가 다릅니다. 다시 입력해주세요.");
      setNow_pwd("");
      return;
    }
    if (new_pwd !== new_pwd_check) {
      alert("비밀번호가 일치하지 않습니다.");
      setNew_pwd("");
      setNew_pwd_check("");
      return;
    }

    //비밀번호가 맞을 때
    if (new_pwd === "") {
      alert("비밀번호를 입력해 주세요.");
      return;
    }
    const item = {
      id: "1",
      nickName: newNickName,
      email: newEmail,
      password: new_pwd,
      address: newAddress,
    };
    call("/user/changing", "PUT", item)
      .then((response) => {
        console.log("Data updated successfully", response);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
    movePage("/user/mypage");
  };

  return (
    <div>
      <form onSubmit={pwdSubmit}>
        <div className="Changing-1">
          <div>
            <h1 className="changing-h1">회원정보 수정</h1>
          </div>
          <div className="changing1">
            <div className="mypage-2" style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>이름</label>
                <label>닉네임</label>
                <label>이메일</label>
                <label>핸드폰 번호</label>
                <label>현재 비밀번호</label>
                <label>새 비밀번호</label>
                <label>비밀번호 확인</label>
                <label>주소</label>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input type="hidden" value={privacys.id} />
                <input
                  type="text"
                  value={newName}
                  placeholder={privacys.name}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                    fontWeight: "bold",
                    border: "none",
                    fontSize: "20px",
                    color: "black",
                    paddingBottom: "9px",
                  }}
                  readOnly
                />
                <input
                  type="text"
                  value={newNickName}
                  placeholder={privacys.nickName}
                  onChange={onNickNameChange}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                  }}
                />
                <input
                  type="email"
                  value={newEmail}
                  placeholder={privacys.email}
                  onChange={onEmailChange}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                  }}
                />
                <input
                  type="text"
                  value={newPhone}
                  placeholder={privacys.phone}
                  onChange={onPhoneChange}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                  }}
                  readOnly
                />
                <input
                  type="text"
                  value={now_pwd}
                  onChange={onNow_PswChange}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                  }}
                />
                <input
                  type="password"
                  value={new_pwd}
                  onChange={onPassWordChange}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                  }}
                />
                <input
                  type="password"
                  value={new_pwd_check}
                  onChange={onNew_PswChange}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                  }}
                />
                <input
                  type="address"
                  value={newAddress}
                  placeholder={privacys.address}
                  onChange={onAddressChange}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                marginTop: "130px",
                textAlign: "right",
                marginRight: "10px",
              }}
            >
              <button type="submit" className="changing-com-button">
                수정 완료
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Changing;
