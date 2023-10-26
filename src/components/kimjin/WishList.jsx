import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Manu.css";
import { Button } from "react-bootstrap";
import { call } from "./ApiService";
import { API_BASE_URL } from "./api-config";
import { Start } from "@mui/icons-material";

const WishList = () => {
  const movePage = useNavigate();
  const [wish, setWish] = useState([]);

  useEffect(() => {
    call("/user/wishlist", "GET", null).then((response) => {
      setWish(response.data);
    });
  }, []);

  const onProductDelete = (e) => {
    call("/user/wishlist/", "DELETE", null).then((response) => {});
  };

  // console.log(wish[2].updateTime);

  return (
    <div className="section">
      <div className="manu-2">
        <div className="manu-2-1">
          <div className="tbody-1">
            {wish &&
              wish.map((a, i) => (
                <div key={i}>
                  <div className="table-main">
                    <div className="table-body">
                      <div className="table-day">
                        {new Date(wish[i].updateTime)
                          .toLocaleDateString()
                          .substring(0, 12)}
                      </div>
                    </div>
                    <div className="td-main">
                      <div className="td-1">
                        <div className="td-1-1">
                          <div className="td-1-1-1">
                            <span className="td-1-1-1-1">
                              {wish[i].sellStatus}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-1">
                            <div className="text-1-1">
                              <div className="text-2">
                                <div
                                  className="text-2-1"
                                  onClick={() => movePage("/detail/" + wish.id)}
                                >
                                  <div className="text-2-img">
                                    <img
                                      className="img1"
                                      src={`${API_BASE_URL}${wish[i].imgUrl}`}
                                      alt=""
                                    />
                                  </div>
                                  <div className="text-2-name">
                                    <div className="text-2-name-1">
                                      <div className="text-2-name-1-1">
                                        {wish[i].title}
                                      </div>
                                      <div className="text-2-name-1-2">
                                        {wish[i].price}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="td-2">
                        <div className="text-button">
                          <Button
                            onClick={onProductDelete}
                            className="text-button-1"
                          >
                            상품삭제
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default WishList;
