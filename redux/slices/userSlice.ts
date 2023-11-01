import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { apiRoute } from "../../global/routes";
import type { AppThunk, RootState } from "../store";

export type UserState = {
  connectedUser: Object | null;
};

const initialState: UserState = {
  connectedUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userProfile: (state, { payload }) => {
      state.connectedUser = payload;
    },
  },
});

export const { userProfile } = userSlice.actions;

export const getUserProfileFromState = (state: RootState) =>
  state.user.connectedUser;

export const getUserProfile =
  (wallet_address: string): AppThunk =>
  async dispatch => {
    try {
      const res = await axios.get(`${apiRoute}/users/${wallet_address}`);
      dispatch(userProfile(res.data));
    } catch (err) {
      console.log(err);
    }
  };

export const editUserProfile =
  (wallet_address: string, values: any): AppThunk =>
  async dispatch => {
    console.log("tes");
    try {
      const { data } = await axios.patch(
        `${apiRoute}/users/${wallet_address}`,
        values
      );
      console.log(data);
      toast("🚀 User Edited Successfully", { autoClose: 3000 });
      return { success: true };
    } catch (error: any) {
      console.log(error);
      toast.error("User Not Edited", { autoClose: 3000 });
      return { success: false };
    }
  };

export default userSlice.reducer;
