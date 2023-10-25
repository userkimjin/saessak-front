import React, { useEffect, useState } from "react";
import "./GameResult.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../main/Header";
import Footer from "../main/Footer";

const GameResult = () => {
  const { finalresult } = useParams();
  const navigate = useNavigate();
  const [resultscore, setResultscore] = useState("");
  //console.log(finalresult);
  // const 받을변수 = useParams().key;
  const game = useSelector((state) => state.game.data);

  console.log("게임결과페이지", game);
  const finalresultint = parseInt(finalresult);

  useEffect(() => {
    if (finalresultint > 90) {
      setResultscore("!!!!!물가 전문가!!!!!");
    } else if (finalresultint > 70) {
      setResultscore("전자 두뇌!!!!");
    } else if (finalresultint > 50) {
      setResultscore("가격표는 보시는군요 ㅎ ");
    } else if (finalresultint > 40) {
      setResultscore("이제 영수증 챙겨 다니세요 ㅠ");
    } else {
      setResultscore("이사람 심부름 시키면 개비싼거사옴 ㄷㄷ;;");
    }
  }, [finalresultint]);
  if (JSON.stringify(game) === "{}") {
    navigate("/game");
  } else {
    return (
      <>
        <div className="gr-container1">
          <Header />
          <main>
            <h3> 당신의 점수는 ?!</h3>
            <h1>{finalresult}점</h1>
            <h3>{resultscore}</h3>
            <p>지금 보신 상품은 어떠신가요?</p>

            <div className="gr-imgBoxs">
              {game &&
                game.map((p) => (
                  <div key={p.productId}>
                    <div
                      className="gr-imgBox1"
                      onClick={() => {
                        navigate("/detail/" + p.productId);
                      }}
                    >
                      <img className="gr-img1" src={p.imgUrl} alt="이미지1" />
                      <div className="gr-text1">
                        <div className="gr-textTitle">
                          <span>{p.title}</span>
                        </div>
                        <p>{p.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </main>
        </div>
        <Footer />
      </>
    );
  }
};
export default GameResult;
