//@ts-nocheck
import Modal from "react-modal";
import Image from "next/image";
import { FaTelegramPlane } from "@react-icons/all-files/fa/FaTelegramPlane";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { MdClose } from "@react-icons/all-files/md/MdClose";
import { customStyles } from "./customStyles";
import {
  TelegramShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";

Modal.setAppElement("#__next");

interface IItem {
  totalPrice: string;
  itemId: string;
  seller: string;
  name: string;
  description: string;
  image: string;
  id: string;
}

interface IProps {
  isOpen: boolean;
  toggleModal: () => void;
  item: IItem;
}

const PaymentSuccessful: React.FC<IProps> = ({ isOpen, toggleModal, item }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      contentLabel="My dialog"
      style={customStyles}
    >
      <div className="text-center">
        <div className="flex justify-between">
          <i aria-label="" />
          <p className="font-semibold text-xl">Payment Successful</p>
          <button onClick={toggleModal}>
            <MdClose size={25} />
          </button>
        </div>

        <div className="my-5 border border-gray100 -mx-9"></div>

        <Image src={item.image} alt="art" width={"200px"} height={"200px"} />

        <p className="p-10">
          You successfully purchased{" "}
          {/* <span className="font-medium">{item.description}</span> from{" "} */}
          <span className="font-medium">{item.name}</span>
        </p>

        <div className="border border-gray100 -mx-9"></div>

        <p className="my-3 font-medium">Share</p>
        <div className="flex gap-4 items-center justify-center">
          <TwitterShareButton
            url="I just bought NFT from Rising Talent: Checkout the awesome collection: https://rising-talent.vercel.app/"
            hashtags={["risingTalent", "nftMarketplace"]}
          >
            <FaTwitter size={25} className="cursor-pointer" />
          </TwitterShareButton>

          <TelegramShareButton url="I just bought NFT from Rising Talent: Checkout the awesome collection: https://rising-talent.vercel.app/">
            <FaTelegramPlane size={25} className="cursor-pointer" />
          </TelegramShareButton>

          <FacebookShareButton
            url="https://rising-talent.vercel.app/"
            hashtag={"#risingTalent"}
          >
            <FaFacebook size={25} className="cursor-pointer" />
          </FacebookShareButton>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentSuccessful;
