import { MdClose } from "@react-icons/all-files/md/MdClose";
import Image from "next/image";
import ReactModal from "react-modal";
import CButton from "../CButton";
import { customStyles } from "./customStyles";

ReactModal.setAppElement("#__next");

interface IProps {
  isOpen: boolean;
  toggleModal: () => void;
  toggleModal2: () => void;
}

const CheckoutModal: React.FC<IProps> = ({
  isOpen,
  toggleModal,
  toggleModal2,
}) => {
  return (
    <ReactModal isOpen={isOpen} style={customStyles}>
      <div className="text-center">
        <div className="flex justify-between">
          <i aria-label="" />
          <p className="font-semibold text-xl">Check Out</p>
          <button onClick={toggleModal}>
            <MdClose size={25} />
          </button>
        </div>
        <div className="my-5 border border-gray100 -mx-9"></div>

        <div className="flex justify-between items-center">
          <p className="font-medium">Item</p>
          <p className="font-medium">Subtotal</p>
        </div>

        <div className="flex justify-between py-9">
          <div className="w-3/5 flex justify-start ">
            <Image
              src={"/images/bid-cards/card-mock2.png"}
              alt="demo"
              width={100}
              height={100}
            />
            <div className="flex flex-col justify-center items-start w-3/4 px-3">
              <p className="font-bold">Happy Panda</p>
              <p>Abstact Smoke Red Blue</p>
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <p>
              4.5 <span className="font-medium">ETH</span>
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center pb-7">
          <p className="font-medium">Total</p>
          <p>
            4.5 <span className="font-medium">ETH</span>
          </p>
        </div>

        <div className="border border-gray100 md:-mx-6 lg:-mx-9"></div>

        <div className="mx-auto w-4/5 flex justify-around items-center h-full pt-5">
          <CButton
            variant="primary"
            onClick={toggleModal2}
            customClasses="w-48 mr-5"
          >
            Checkout
          </CButton>
          <CButton
            variant="secondary"
            onClick={toggleModal}
            customClasses="w-48"
          >
            Cancel
          </CButton>
        </div>
      </div>
    </ReactModal>
  );
};

export default CheckoutModal;
