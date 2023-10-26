import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import AddProduct2 from "./components/addProduct/AddProduct2";
import AdminPage from "./components/admin/AdminPage";
import BoardInfo from "./components/board/BoardInfo";
import BoardMain from "./components/board/BoardMain";
import BoardNtc from "./components/board/BoardNtc";
import BoardNtcInfo from "./components/board/BoardNtcInfo";
import CreateNotice from "./components/board/CreateNotice";
import CreateVoice from "./components/board/CreateVoice";
import BoardPage from "./components/board2/BoardPage";
import Detail from "./components/detail/Detail";
import Game from "./components/game/Game";
import GameResult from "./components/game/GameResult";
<<<<<<< HEAD
import Main from "./components/main/Main";
import ProductList from "./components/productList/ProductList";
import BoardInfo from "./components/board/BoardInfo";
import BoardNtc from "./components/board/BoardNtc";
import BoardNtcInfo from "./components/board/BoardNtcInfo";
import UpdateProduct from "./components/updateProduct/UpdateProduct";
import { Layout } from "./components/mypage/layout";
import Chatting from "./components/kimjin/Chatting";
import AddProduct2 from "./components/addProduct/AddProduct2";
import UpdateProduct2 from "./components/updateProduct/UpdateProduct2";
import BoardPage from "./components/board2/BoardPage";
import Modal from "./components/detail/Modal";
=======
import Chatting from "./components/kimjin/Chatting";
import { Layout } from "./components/kimjin/layout";
import Main from "./components/main/Main";
>>>>>>> 450fab08d9205c7eca43389e43b826e2648b3e19
import ProductList2 from "./components/productList/ProductList2";
import UpdateProduct2 from "./components/updateProduct/UpdateProduct2";
import BoardEditorPage from "./components/board2/BoardEditorPage";
import BoardViewerPage from "./components/board2/BoardViewerPage";
import SmsTest from "./components/SmsTest";

function App() {
  const [page, setPage] = useState(1);
  return (
    <div>
      <Routes>
        <Route path="/admin/:page?" element={<AdminPage />} />
        <Route path="/" element={<Main />} />
        <Route path="/search/:searchItem?" element={<ProductList2 />} />
        <Route path="/addproduct" element={<AddProduct2 />} />
        <Route path="/updateproduct/:id" element={<UpdateProduct2 />} />
        <Route path="/game" element={<Game />} />
        <Route path="/gameresult/:finalresult" element={<GameResult />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/detail" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<SignUp />} />
        <Route path="/boardmain" element={<BoardMain page={page} />} />
        <Route path="/boardwrite" element={<CreateNotice />} />
        <Route path="/boardmain/1" element={<CreateVoice page={page} />} />
        <Route path="/user/*" element={<Layout />}></Route>
        <Route path="/boardmain/ntc" element={<BoardNtc />}></Route>
        <Route path="/boardmain/ntc/:id?" element={<BoardNtcInfo />}></Route>
        <Route path="/boardmain/info/:id?" element={<BoardInfo />}></Route>
        <Route path="/chatting" element={<Chatting />}></Route>
<<<<<<< HEAD
        <Route path="/board" element={<BoardPage />}></Route>
        <Route path="/board/:boardName?" element={<BoardPage />}></Route>
        <Route path="/modal" element={<Modal />}></Route>
=======
        <Route path="/board/list/:boardName?" element={<BoardPage />}></Route>
        <Route path="/board/write/:boardName?" element={<BoardEditorPage />}></Route>
        <Route path="/board/detail/:boardName/:boardId" element={<BoardViewerPage />}></Route>
        <Route path="/login/oauth2/kakao?" />
        <Route path="/smstest" element={<SmsTest />} />
>>>>>>> 450fab08d9205c7eca43389e43b826e2648b3e19
      </Routes>
    </div>
  );
}

export default App;
