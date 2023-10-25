import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../main/Footer";
import Header from "../main/Header";
import "../addProduct/AddProduct.scss";
import { call, uploadProduct } from "../../ApiService";

const UpdateProduct2 = () => {
  const [imgFile, setImgFile] = useState([]);
  const [imgCount, setImgCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [productTitle, setProductTitle] = useState("");
  const [productContent, setProductContent] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productSellStatus, setProductSellStatus] = useState("");
  const [productMapData, setProductMapData] = useState("");
  const [imageDTOList, setImageDTOList] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken !== "") {
      // 로그인한 상태
      setIsLogin(true);

      call("/product/searchone", "POST", { id: id }).then((response) => {
        console.log("error: " + response.error);
        if (response.error && response.error !== "") {
          if (response.error === "no authority") {
            alert("상품 수정권한이 없습니다");
            navigate(-1);
            return;
          } else if (response.error === "no product") {
            alert("존재하지 않는 상품입니다");
            navigate(-1);
            return;
          }
        }

        setProductTitle(response.data[0].title);
        setProductContent(response.data[0].content);
        setProductPrice(response.data[0].price);
        setProductSellStatus(response.data[0].sellStatus);
        setProductMapData(response.data[0].mapData);
        const responseImgFileList = response.data[0].imageDTOList;
        setImgCount(responseImgFileList.length);
        setImageDTOList(responseImgFileList);
      });
    } else {
      alert("로그인 후 이용해주세요!");
      navigate("/login");
    }
  }, [id]);

  const getImgSrc = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const newImgFile = [...imgFile, file];
    const newImgDTO = [
      ...imageDTOList,
      {
        id: "",
        imgName: "",
        oriName: "",
        imgUrl: URL.createObjectURL(file),
      },
    ];

    setImgFile(newImgFile);
    setImageDTOList(newImgDTO);
    setImgCount(imgCount + 1);
  };

  const removeImg = (imgDTO) => {
    const newImgFile = imgFile.filter(
      (f) => URL.createObjectURL(f) !== imgDTO.imgUrl
    );
    const newImgDTOList = imageDTOList.filter(
      (img) => img.imgUrl !== imgDTO.imgUrl
    );
    setImgFile(newImgFile);
    setImageDTOList(newImgDTOList);
    setImgCount(imgCount - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (imageDTOList && imageDTOList.length === 0) {
      alert("이미지는 적어도 하나 이상 있어야 합니다.");
      return;
    }

    // 이미지 DTO 추가
    let newImageDTOList = [];
    if (imageDTOList && imageDTOList.length > 0) {
      for (let i = 0; i < imageDTOList.length; i++) {
        // 기존에 가져왔던 데이터만 다시 실어서 보냄
        if (imageDTOList[i].id !== "") {
          newImageDTOList.push(imageDTOList[i]);
        }
      }
    }

    const request = {
      id: id,
      title: productTitle,
      price: productPrice,
      content: productContent,
      mapData: productMapData,
      sellStatus: productSellStatus,
      imageDTOList: newImageDTOList,
    };

    // dispatch({ type: "product/add", payload: newProduct });
    // navigate("/search");

    // 상품 및 기존 이미지 정보만 먼저 업데이트
    call("/product/update", "POST", request).then((response) => {
      const result = response.data[0];
      alert(result);
      if (result === "success") {
        navigate("/search");
      }
    });

    // 새로 추가한 이미지 업로드
    if (imgFile && imgFile.length > 0) {
      const uploadImg = new FormData();
      uploadImg.append("id", id);
      for (let i = 0; i < imgFile.length; i++) {
        uploadImg.append("productImgList", imgFile[i]);
      }

      uploadProduct("/product/upload", "POST", uploadImg).then((response) => {
        const result2 = response.data[0];
        alert(result2);
        if (result2 === "imgUpload success") {
          navigate("/search");
        }
      });
    }
  };

  const handleTitle = (e) => {
    setProductTitle(e.target.value);
  };

  const handlePrice = (e) => {
    setProductPrice(e.target.value);
  };

  const handleContent = (e) => {
    setProductContent(e.target.value);
  };

  const handleMapData = (e) => {
    setProductMapData(e.target.value);
  };

  let content = <div></div>;

  if (isLogin) {
    content = (
      <div>
        <Header />
        <main>
          <div className="addProductContainer">
            <div className="addContents">
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="content-form"
                method="POST"
              >
                <div className="imgUploadBox">
                  <div>
                    <div className="labelButton">
                      <label htmlFor="chooseFile">
                        이미지를 넣어주세요! (최대 3장)
                      </label>
                    </div>

                    <input
                      type="file"
                      name="chooseFile"
                      id="chooseFile"
                      accept="image/*"
                      onChange={getImgSrc}
                      disabled={imgCount === 3}
                    />
                  </div>
                  <div className="previewImg">
                    {imageDTOList.map((imgDTO) => (
                      <div className="imgItem" key={imgDTO.imgUrl}>
                        <img
                          className="imgItem"
                          src={
                            imgDTO.imgUrl.includes("/images/product")
                              ? "http://localhost:8888" + imgDTO.imgUrl
                              : imgDTO.imgUrl
                          }
                          alt="예시이미지"
                        />
                        <button onClick={() => removeImg(imgDTO)}>삭제</button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="addName">
                  <input
                    type="text"
                    placeholder="새로운 새싹에게 이름을 지어주세요!"
                    name="name"
                    value={productTitle}
                    onChange={handleTitle}
                  />
                </div>
                <div className="addPrice">
                  <input
                    type="text"
                    placeholder="새싹의 가격은?"
                    name="price"
                    value={productPrice}
                    onChange={handlePrice}
                  />
                </div>
                <div className="addLocal">
                  <input
                    type="text"
                    placeholder="거래희망 지역을 알려주세요!"
                    name="wantPlace"
                    value={productMapData}
                    onChange={handleMapData}
                  />
                </div>
                <div className="addText">
                  <textarea
                    name="text"
                    id=""
                    cols=""
                    rows="10"
                    placeholder="새싹의 정보를 알려주세요!"
                    onChange={handleContent}
                    value={productContent}
                  ></textarea>
                </div>
                <div className="submitBtn">
                  <button type="submit">새싹 심기!</button>
                  <button
                    type="reset"
                    onClick={() => {
                      const resetImgFile = [];
                      setImgFile(resetImgFile);
                    }}
                  >
                    취소하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return content;
};

export default UpdateProduct2;