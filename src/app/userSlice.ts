import {createSlice} from "@reduxjs/toolkit";

interface IState{
  user:{
    user:{
    id: number,
    name: string,
    isLogged: boolean,
    isAdmin: boolean,  }
  }
}

export const userSlice = createSlice({
  name:"user",
  initialState:{
    user:{
      id: null,
      name: null,
      isLogged: false,
      isAdmin: null,  }
  },
  reducers:{
    login: (state, action) =>{
      state.user = action.payload;
    }
  }
})

export const { login } = userSlice.actions;
export const selectUser = (state : IState) => state.user.user;
export default userSlice.reducer;