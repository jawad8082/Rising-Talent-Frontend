import React from "react";
import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import { colors } from "../global/colors";

interface ICSearchbar {
  placeholder: string;
}

const CSearchbar = ({ placeholder }: ICSearchbar) => {
  return (
    <div className="flex items-center justify-center border border-gray100 rounded-lg grow">
      <div className="relative text-gray-600 focus-within:text-gray-400 flex-1">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <FiSearch color={colors.gray200} />
        </span>
        <input
          type="text"
          name="q"
          className="py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-full"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default CSearchbar;
