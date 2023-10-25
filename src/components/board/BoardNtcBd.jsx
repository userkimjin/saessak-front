import React from 'react';
import './NoticeBoard.css';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const BoardNtcBd = ({ page }) => {
  const dummy = useSelector((state) => state.ntcData);
  const num = dummy.length;

  const navigate = useNavigate();
  return (
    <>
      <div className="table">
        <div className="thead">
          <div className="tr">
            <div className="th">번호</div>
            <div className="th">제목</div>
            <div className="th">작성자</div>
            <div className="th">작성일</div>
            <div className="th">조회수</div>
          </div>
        </div>
        <div className="tbody">
          {dummy.slice((page - 1) * 15, page * 15).map((e, i) => {
            return (
              <div className="tr" key={i} onClick={() => navigate('/boardmain/ntc/' + e.id)}>
                <div className="td">{num - i - (page - 1) * 15}</div>
                <div className="td">{e.title}</div>
                <div className="td">{e.writer}</div>
                <div className="td">
                  {new Date().getDate() === new Date(e.date).getDate()
                    ? new Date(e.date).toLocaleTimeString()
                    : new Date(e.date).toLocaleDateString()}
                </div>
                <div className="td">{e.clicked}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BoardNtcBd;
