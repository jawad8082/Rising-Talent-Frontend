//@ts-nocheck
import type { NextPage } from "next";
import { useState, useEffect, useCallback } from "react";
import BidCard from "../components/BidCard";
import SellerCard from "../components/SellerCard";
import { useQuery } from "@tanstack/react-query";
import {
  getAccounts,
  getMarketplaceAbi,
  getNFTAbi,
  web3Handler,
} from "../redux/slices/contractSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import CProgressBar from "../components/CProgressBar";
import { BigNumber } from "ethers";
import { apiRoute } from "../global/routes";
import axios from "axios";

const Explore: NextPage = () => {
  const { isLoading, error, data } = useQuery(["Sellers"], () =>
    fetch(`${apiRoute}/users/`).then(res => res.json())
  );

  console.log(data);

  const dispatch = useAppDispatch();

  const marketplace = useAppSelector(getMarketplaceAbi);
  const nft = useAppSelector(getNFTAbi);
  const account = useAppSelector(getAccounts);

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [itemsDisabled, setItemsDisabled] = useState(false);

  const loadHotBids = useCallback(async () => {
    try {
      const response = await axios.get(`${apiRoute}/nfts/hotBids`);
      return response.data?.hotBids ?? [];
    } catch (error) {
      console.log(error);
    }
  }, []);

  const loadMarketplaceItems = useCallback(async () => {
    // Load all unsold items
    setLoading(true);

    const itemCount = await marketplace.itemCount();
    const hotBids = await loadHotBids();

    let _items = [];
    const marketplaceItems = [];
    const placeholderItems = [];

    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      if (!item.sold) {
        marketplaceItems.push({
          ...item,
          fav: [],
        });

        placeholderItems.push({
          itemId: item.itemId,
          totalPrice: BigNumber.from(0),
          seller: item.seller,
          name: "Loading ...",
          description: "",
          image: "/images/placeholder-bg.png",
          disabled: true,
          fav: [],
        });
      }
    }

    setItemsDisabled(true);
    setItems(placeholderItems);
    setLoading(false);

    // post skeleton loading
    for (let item of marketplaceItems) {
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId);
        // Add item to items array
        const itemCid = metadata.image.split("/ipfs/")[1];
        const foundBid = hotBids.find(bid => bid.unique_cid === itemCid) ?? {
          favourites: [],
        };

        _items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          fav: foundBid.favourites,
        });
      }
    }

    setItemsDisabled(false);
    setItems(_items);
  }, [loadHotBids, marketplace, nft]);

  const buyMarketItem = async item => {
    await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
    loadMarketplaceItems();
  };

  useEffect(() => {
    dispatch(web3Handler());
  }, [dispatch]);

  useEffect(() => {
    marketplace && nft && loadMarketplaceItems();
  }, [nft, marketplace, loadMarketplaceItems]);

  if (!account)
    return (
      <div className="xs:w-3/4 md:w-3/6 h-52 rounded-2xl bg-primary-gradient relative overflow-hidden flex justify-center items-center my-10 mx-auto">
        <div className="absolute w-52 h-52 rounded-full bg-light opacity-20 -top-24 -left-24" />
        <div className="absolute w-52 h-52 rounded-full bg-light opacity-20 -right-6 -bottom-16" />
        <h3 className="font-bold text-light sm:text-xl md:text-3xl w-4/5">
          Please connect your metamask first
        </h3>
      </div>
    );
  if (loading || isLoading)
    return (
      <main className="w-full flex items-center justify-center p-56">
        <CProgressBar />
      </main>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="w-full flex flex-col items-center justify-evenly">
      <div className="xs:w-3/4 md:w-3/6 h-52 rounded-2xl bg-primary-gradient relative overflow-hidden flex justify-center items-center my-10">
        <div className="absolute w-52 h-52 rounded-full bg-light opacity-20 -top-24 -left-24" />
        <div className="absolute w-52 h-52 rounded-full bg-light opacity-20 -right-6 -bottom-16" />
        <h3 className="font-bold text-light sm:text-xl md:text-3xl w-4/5">
          Discover, collect, and sell extraordinary NFTs
        </h3>
      </div>
      <h3 className="md:w-4/6 font-semibold text-3xl my-7 sm:text-center md:text-left">
        Top Sellers
      </h3>
      <div className="w-4/6 flex xs:justify-center sm:justify-center md:justify-between items-center flex-wrap">
        {data.slice(0, 5).map((n, i) => (
          <SellerCard
            key={i}
            badge={i + 1}
            name={n.username}
            image={n.profile_url}
          />
        ))}
      </div>
      <h3 className="w-4/6 font-semibold text-3xl my-7 xs:text-center md:text-left">
        Hot Bids
      </h3>

      <div className="w-4/6 flex xs:justify-center sm:justify-center md:justify-between items-center flex-wrap">
        {items?.length > 0 ? (
          items.map((n, i) => (
            <BidCard
              key={i}
              item={n}
              account={account}
              disabled={itemsDisabled}
              handleFavClick={(op, addr) => {
                if (op === "favourite") {
                  setItems(_prevItems =>
                    _prevItems.map(item => {
                      if (item === n) {
                        return { ...item, fav: [...item.fav, addr] };
                      }
                      return item;
                    })
                  );
                } else if (op === "unfavourite") {
                  setItems(_prevItems =>
                    _prevItems.map(item => {
                      if (item === n) {
                        return {
                          ...item,
                          fav: item.fav.filter(user => user !== addr),
                        };
                      }
                      return item;
                    })
                  );
                }
              }}
            />
          ))
        ) : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No listed assets</h2>
          </main>
        )}
      </div>
      {/* <div className="my-10">
        <CButton variant="secondary" onClick={() => null} customClasses="w-60">
          Load More
        </CButton>
      </div> */}
    </div>
  );
};

export default Explore;
