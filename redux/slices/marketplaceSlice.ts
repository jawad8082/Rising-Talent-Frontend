import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type ContractState = {
  items: Array<Object> | null;
  error: string | null;
  loading: boolean;
  status: boolean;
};

const initialState: ContractState = {
  error: null,
  loading: false,
  items: null,
  status: false,
};

export const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    setMarketplaceItems: (state, { payload }) => {
      state.items = payload;
    },
    getItemsStart: state => {
      state.loading = true;
      state.status = false;
      state.items = null;
    },
    getItemsSuccess: (state, { payload }) => {
      const { result } = payload;
      state.items = result;
      state.status = true;
      state.error = null;
      state.loading = false;
    },
    getItemsFailed: (state, { payload }) => {
      state.items = null;
      state.error = payload;
      state.loading = false;
      state.status = false;
    },
    getItemsClear: state => {
      state.items = null;
      state.error = null;
      state.loading = false;
      state.status = false;
    },
  },
});
export const { getItemsSuccess, getItemsFailed, setMarketplaceItems } =
  marketplaceSlice.actions;

export const getItems = (state: RootState) => state.marketplace.items;

export default marketplaceSlice.reducer;
