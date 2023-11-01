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

const BidCard: React.FC<IProps> = ({
  item,
  account,
  disabled = false,
  handleFavClick,
  noLink = false,
}) => {
  const router = useRouter();

  const pushToItemPage = () => {
    const _item = { ...item };
    _item.fav = _item.fav?.length ?? 0;
    router.push({
      pathname: `/item/${_item.itemId}`,
      query: {
        ..._item,
        priceToShow: ethers.utils.formatEther(_item.totalPrice),
        totalPrice: _item.totalPrice.toString(),
        itemId: _item.itemId.toString(),
      },
    });
  };

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    setIsFavourite(
      Boolean(item?.fav.filter(address => address === account[0]).length > 0)
    );
  }, [account, item.fav]);

  const hitFavBtn = async () => {
    handleFavClick(isFavourite ? "unfavourite" : "favourite", account[0]);
    setIsFavourite(!isFavourite);
    let newLink = item.image.split("/ipfs/")[1];
    let dataToSend = {
      wallet_address: account[0],
      unique_cid: newLink,
    };
    try {
      const res = await axios.post(`${apiRoute}/nfts/favourite`, dataToSend);
      console.log(res);
    } catch (err) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (disabled) return;

    async function fetchFavStatus() {
      const response = axios.get(`${apiRoute}/nfts/favourite`);
    }
  }, [disabled]);

  return (
    <div className="w-56 rounded-3xl shadow-lg mb-5 ">
      <div
        className="rounded-3xl flex justify-center items-center mx-2 mb-2 mt-5 overflow-hidden cursor-pointer"
        onClick={disabled ? () => {} : pushToItemPage}
      >
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

          <div
            className="flex items-center text-dark cursor-pointer text-xl"
            onClick={hitFavBtn}
          >
            {isFavourite ? <AiFillHeart /> : <AiOutlineHeart />}{" "}
            <div className="text-sm">{item.fav?.length ?? 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidCard;
