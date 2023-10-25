import { createSlice } from "@reduxjs/toolkit";

let id = 10000;
const objecttion = createSlice({
  name: 'objecttion',
  initialState: [
    {
      id: id++ +'',
      upTime: "2023.08.21 05:39",
      fixTime: "2023.08.21 05:39",
      title: '제가 왜 정지당한거죠???',
      writer: 'psh',
      content : '풀어줘요!!',
      viewCount : '0'
    },
  ],
  reducers: {
    addSP: (state, action) => {
      state.select_pitem.indexOf(action.payload) >= 0 ? console.log() : state.select_pitem.unshift(action.payload);
    }
  }
});

export default objecttion;