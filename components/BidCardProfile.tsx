//@ts-nocheck
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";
import { AiOutlineHeart } from "@react-icons/all-files/ai/AiOutlineHeart";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import { apiRoute } from "../global/routes";

interface IProps {
  item: {
    image: string;
    name: string;
    totalPrice: string | number;
    fav: string | number;
  };
}

const BidCardProfile: React.FC<IProps> = ({ item }) => {
  return (
    <div className="w-56 rounded-3xl shadow-lg mb-5 ">
      <div className="rounded-3xl flex justify-center items-center mx-2 mb-2 mt-5 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={item.name} className="h-72" width={210} />
      </div>

      <div className="px-6 pb-4 pt-2">
        <div className="font-semibold text-md mb-2">{item.name}</div>
        <div className="flex items-center justify-between text-dark">
          <div>
            <span className="font-semibold">
              {" "}
              {ethers.utils.formatEther(item.totalPrice)}
            </span>{" "}
            <span className="font-sm">ETH</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidCardProfile;
