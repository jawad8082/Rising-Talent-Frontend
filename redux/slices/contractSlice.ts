// @ts-nocheck
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ethers } from "ethers";
import { apiRoute } from "../../global/routes";
import type { AppThunk, RootState } from "../store";
import MarketplaceAbi from "../../global/contractsData/Marketplace.json";
import MarketplaceAddress from "../../global/contractsData/Marketplace-address.json";
import NFTAbi from "../../global/contractsData/NFT.json";
import NFTAddress from "../../global/contractsData/NFT-address.json";

export type ContractState = {
  accounts: Array<Object> | null;
  marketplaceAbi: Object | null;
  nftAbi: Object | null;
};

const initialState: ContractState = {
  accounts: null,
  marketplaceAbi: null,
  nftAbi: null,
};

export const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    accountsHandler: (state, { payload }) => {
      state.accounts = payload;
    },
    marketplaceAbiHandler: (state, { payload }) => {
      state.marketplaceAbi = payload;
    },
    nftAbiHandler: (state, { payload }) => {
      state.nftAbi = payload;
    },
  },
});
export const { accountsHandler, marketplaceAbiHandler, nftAbiHandler } =
  contractSlice.actions;

export const getAccounts = (state: RootState) => state.contract.accounts;
export const getMarketplaceAbi = (state: RootState) =>
  state.contract.marketplaceAbi;
export const getNFTAbi = (state: RootState) => state.contract.nftAbi;

export const web3Handler = (): AppThunk => async dispatch => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  try {
    let signer = null;
    const result = await axios.post(`${apiRoute}/users/${accounts[0]}`);
    if (result.status === 201) {
      dispatch(accountsHandler(accounts));
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      dispatch(loadContracts(signer));
    }
    return;
  } catch (err) {
    console.log(err);
  }
};

export const loadContracts =
  (signer: any): AppThunk =>
  async dispatch => {
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );
    dispatch(marketplaceAbiHandler(marketplace));

    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    dispatch(nftAbiHandler(nft));
  };

export default contractSlice.reducer;
