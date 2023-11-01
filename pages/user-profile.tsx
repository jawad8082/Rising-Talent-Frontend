//@ts-nocheck
import axios from "axios";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import BidCardProfile from "../components/BidCardProfile";
import CProgressBar from "../components/CProgressBar";
import CSearchbar from "../components/CSearchbar";
import CSelect from "../components/CSelect";
import { apiRoute } from "../global/routes";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getAccounts,
  getMarketplaceAbi,
  getNFTAbi,
  web3Handler,
} from "../redux/slices/contractSlice";

const UserProfile: NextPage = () => {
  const accounts = useAppSelector(getAccounts);
  const marketplace = useAppSelector(getMarketplaceAbi);
  const nft = useAppSelector(getNFTAbi);
  console.log({ accounts, marketplace, nft });
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const [listedItems, setListedItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const dispatch = useAppDispatch();

  const [userProfile, setUserProfile] = useState({
    username: "unnamed",
    bio: "",
    email: "",
    profile_url: "",
    profile_banner: "",
    // wallet_address: accounts[0],
  });

  useEffect(() => {
    dispatch(web3Handler());
  }, []);

  const loadPurchasedItems = async () => {
    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
    const filter = marketplace.filters.Bought(
      null,
      null,
      null,
      null,
      null,
      accounts
    );
    const results = await marketplace.queryFilter(filter);
    //Fetch metadata of each nft and add that to listedItem object.
    const purchases = await Promise.all(
      results.map(async i => {
        // fetch arguments from each result
        i = i.args;
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId);
        // define listed item object
        let purchasedItem = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };
        return purchasedItem;
      })
    );
    setLoading(false);
    setPurchases(purchases);
  };

  const loadListedItems = async () => {
    // Load all sold items that the user listed
    const itemCount = await marketplace.itemCount();
    let listedItems = [];
    let soldItems = [];
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await marketplace.items(indx);
      if (i.seller.toLowerCase() === accounts[0]) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId);
        // define listed item object
        let item = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };
        listedItems.push(item);
        // Add listed item to sold items array if sold
        if (i.sold) soldItems.push(item);
      }
    }
    setLoading(false);
    setListedItems(listedItems);
    setSoldItems(soldItems);
  };

  const getUserProfile = async () => {
    try {
      const result = await axios.get(`${apiRoute}/users/${accounts[0]}`);
      console.log(result);
      setUserProfile(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserProfile();
    nft && marketplace && loadPurchasedItems();
    nft && marketplace && loadListedItems();
  }, [nft, marketplace]);

  if (loading)
    return (
      <main className="w-full flex items-center justify-center p-56">
        <CProgressBar />
      </main>
    );
  return (
    <>
      <div className="w-100 relative h-96">
        <Image
          alt="Mountains"
          src={userProfile.profile_banner || "/images/banner-mock.png"}
          layout="fill"
          objectFit="cover"
          sizes="100%"
        />
      </div>

      <div className="-mt-24 text-center">
        <Image
          className="rounded-full"
          src={userProfile.profile_url || "/images/avatar.webp"}
          alt="Profile"
          width={180}
          height={180}
        />
        <h1 className="font-semibold text-3xl mt-1">
          {userProfile.username || "unnamed"}
        </h1>
      </div>

      <div className="mt-20"></div>

      <div className="flex flex-wrap gap-5 justify-items-center xs:px-10 lg:px-60">
        <CSearchbar placeholder="Search NFT" />
        <CSelect />
      </div>

      <h1 className="font-semibold text-3xl my-7 lg:px-60 xs:text-center sm:text-center md:text-left lg:text-left">
        My Purchases
      </h1>
      <CardList items={purchases} />
      {/* {purchases.length > 0 ? (
        <CButton
          variant="secondary"
          customClasses="mx-auto sm:w-3/12 mb-20 mt-10"
          onClick={() => {}}
        >
          Load More
        </CButton>
      ) : null} */}

      <h1 className="font-semibold text-3xl my-7 lg:px-60 xs:text-center sm:text-center md:text-left lg:text-left">
        My Listed Items
      </h1>
      <CardList items={listedItems} />
      {/* {listedItems.length > 0 ? (
        <CButton
          variant="secondary"
          customClasses="mx-auto sm:w-3/12 mb-20 mt-10"
          onClick={() => {}}
        >
          Load More
        </CButton>
      ) : null} */}

      <h1 className="font-semibold text-3xl my-7 lg:px-60 xs:text-center sm:text-center md:text-left lg:text-left">
        Sold Items
      </h1>
      <CardList items={soldItems} />
      {/* {soldItems.length > 0 ? (
        <CButton
          variant="secondary"
          customClasses="mx-auto sm:w-3/12 mb-20 mt-10"
          onClick={() => {}}
        >
          Load More
        </CButton>
      ) : null} */}
    </>
  );
};

const CardList = ({ items }) => {
  return (
    <div className="lg:px-60">
      <div className="flex justify-around items-center flex-wrap gap-5">
        {items.length > 0 ? (
          items.map((n, i) => <BidCardProfile key={i} item={n} />)
        ) : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No items found</h2>
          </main>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
