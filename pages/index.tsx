import type { NextPage } from "next";
import About from "../components/About";
import Team from "../components/TeamSection";

/* 
  uint itemId;
  IERC721 nft;
  uint tokenId;
  uint price;
  address payable seller;
  bool sold; 
*/

const Home: NextPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-evenly">
      <div className="xs:w-3/4 md:w-3/6 h-52 rounded-2xl bg-primary-gradient relative overflow-hidden flex justify-center items-center my-10">
        <div className="absolute w-52 h-52 rounded-full bg-light opacity-20 -top-24 -left-24" />
        <div className="absolute w-52 h-52 rounded-full bg-light opacity-20 -right-6 -bottom-16" />
        <h3 className="font-bold text-light sm:text-xl md:text-3xl w-4/5">
          Discover, collect, and sell extraordinary NFTs
        </h3>
      </div>
      <About />
      <Team />
    </div>
  );
};

export default Home;
