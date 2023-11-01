import Image from "next/image";
import React from "react";
import { capitalizeFirstLetter } from "../global/utils";

interface IProps {
  badge: number;
  image: string;
  name: string;
}

const SellerCard: React.FC<IProps> = ({ badge, name, image }) => {
  return (
    <div className="xs:mb-3 border w-44 h-52 border-gray100 rounded-3xl relative flex justify-center items-center flex-col">
      <div className="absolute w-8 h-8 rounded-full bg-primary flex justify-center items-center top-2 left-2 text-light">
        {badge}
      </div>
      <div className="basis-4/5 flex justify-evenly items-center flex-col">
        <div className="rounded-full w-20 h-20 bg-gray100 flex justify-center items-center overflow-hidden">
          <Image src={image} width={80} height={80} alt={name} />
        </div>
        <div className="font-semibold text-dark">
          {name && capitalizeFirstLetter(name)}
        </div>
        <div className="text-dark">
          {/* <span className="font-semibold">{price}</span>{" "}
          <span className="text-sm">{unit}</span> */}
        </div>
      </div>
    </div>
  );
};

export default SellerCard;
