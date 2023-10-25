import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../main/Footer";
import Header from "../main/Header";
import "./AddProduct.scss";

const AddProduct = () => {
  const [imgSrc, setImgSrc] = useState([]);
  const [imgCount, setImgCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getImgSrc = (e) => {
    const file = e.target.files[0];
    const fileSrc = URL.createObjectURL(file);
    const newImgSrc = [...imgSrc, fileSrc];
    setImgSrc(newImgSrc);
    setImgCount(imgCount + 1);
  };

  const removeImg = (src) => {
    const newImgSrc = imgSrc.filter((is) => is !== src);
    setImgSrc(newImgSrc);
    setImgCount(imgCount - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const price = e.target.elements.price.value;
    const wantPlace = e.target.elements.wantPlace.value;
    const text = e.target.elements.text.value;
    // console.log("name: ", name);
    // console.log("price: ", price);
    // console.log("location: ", location);
    // console.log("info: ", info);
    // const imgSrcPack = imgSrc.map((is, i) => {`imgSrc${i}`: is})
    const newProduct = {
      name,
      price,
      text,
      imgsrc1: imgSrc[0] || "",
      imgsrc2: imgSrc[1] || "",
      imgsrc3: imgSrc[2] || "",
      wantPlace,
    };

    dispatch({ type: "product/add", payload: newProduct });
    navigate("/search");
  };

  return (
    <div>
      <Header />
      <main>
        <div className="addProductContainer">
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
              {imgSrc.map((src) => (
                <div className="imgItem" key={src}>
                  <img className="imgItem" src={src} alt="예시이미지" />
                  <button onClick={() => removeImg(src)}>삭제</button>
                </div>
              ))}
            </div>
          </div>
          <div className="addContents">
            <form onSubmit={handleSubmit} className="content-form">
              <div className="addName">
                <input
                  type="text"
                  placeholder="새로운 새싹에게 이름을 지어주세요!"
                  name="name"
                />
              </div>
              <div className="addPrice">
                <input type="text" placeholder="새싹의 가격은?" name="price" />
              </div>
              <div className="addLocal">
                <input
                  type="text"
                  placeholder="거래희망 지역을 알려주세요!"
                  name="wantPlace"
                />
              </div>
              <div className="addText">
                <textarea
                  name="text"
                  id=""
                  cols=""
                  rows="10"
                  placeholder="새싹의 정보를 알려주세요!"
                ></textarea>
              </div>
              <div className="submitBtn">
                <button type="submit">새싹 심기!</button>
                <button
                  type="reset"
                  onClick={() => {
                    const resetImgSrc = [];
                    setImgSrc(resetImgSrc);
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
};

export default AddProduct;
