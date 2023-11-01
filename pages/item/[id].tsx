// @ts-nocheck
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";
import CButton from "../../components/CButton";
import PaymentSuccessful from "../../components/Modals/PaymentSuccessful";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getMarketplaceAbi,
  web3Handler,
} from "../../redux/slices/contractSlice";
import { BigNumber } from "ethers";

const Item: NextPage = () => {
  const [isOpenModal1, setIsOpenModal1] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const query = router;
  const item = query?.query;
  console.log(query);

  function toggleModal1() {
    setIsOpenModal1(!isOpenModal1);
  }

  useEffect(() => {
    dispatch(web3Handler());
  }, [dispatch]);

  const marketplace = useAppSelector(getMarketplaceAbi);

  const buyMarketItem = async () => {
    let itemId = BigNumber.from(item.itemId);
    let totalPrice = BigNumber.from(item.totalPrice);

    await (
      await marketplace?.purchaseItem(itemId, { value: totalPrice })
    ).wait();

    setIsOpenModal1(true);
  };

  return (
    <>
      <div className="sm:p-32 md:p-14 lg:p-24 flex md:justify-around items-center flex-wrap">
        <div className="xs:p-16 lg:p-0">
          {/*  eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt="art" className="rounded-3xl" />
        </div>

        <div className="xs:p-5 lg:p-0">
          <div className="flex">
            <h1 className="font-semibold md:text-3xl mt-1">{item.name}</h1>
            <div className="ml-3 flex items-center text-dark border rounded-3xl px-5">
              <AiFillHeart /> <div className="ml-1 text-sm">{item.fav}</div>
            </div>
          </div>

          <div className="mt-2">
            {/* From <span className="font-semibold">{item.totalPrice} ETH</span>{" "} */}
            &#xb7; MetaBoi Collection
          </div>

          <p className="mt-5 mb-2">Creator</p>
          <div className="flex items-center">
            <Image
              className="rounded-full"
              src="/images/avatar.webp"
              alt="Profile"
              width={50}
              height={50}
            />
            <p className="ml-3 font-medium">Unnamed</p>
          </div>

          {/* selection bar */}
          <div>
            <div className="flex gap-8 text-lg mt-7">
              <p className="font-medium cursor-pointer">Details</p>
              <p className="cursor-pointer">Offers</p>
              <p className="cursor-pointer">History</p>
            </div>
            <div className="border border-gray100"></div>

            <div className="md:w-96 lg:w-96 mt-7">
              <p>{item.description}</p>
            </div>

            <div className="flex gap-4 mt-7 flex-wrap">
              <CButton
                variant="primary"
                customClasses="w-70"
                onClick={buyMarketItem}
              >
                Buy for {item.priceToShow} ETH
              </CButton>

              <CButton
                variant="secondary"
                customClasses="w-52"
                onClick={() => {}}
              >
                Make Offer
              </CButton>
            </div>
          </div>
        </div>
      </div>
      {console.log(item)}
      <PaymentSuccessful
        isOpen={isOpenModal1}
        toggleModal={toggleModal1}
        item={item}
      />
    </>
  );
};

export default Item;
