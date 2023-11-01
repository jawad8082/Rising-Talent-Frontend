//@ts-nocheck
import React from "react";

interface IProps {
  placeholder: string;
  formik?: any;
  name: string;
}

const CTextArea: React.FC<IProps> = ({ placeholder = "", name, formik }) => {
  return (
    <div>
      <div className="flex items-center justify-center border border-gray100 rounded-lg grow">
        <div className="relative text-gray-600 focus-within:text-gray-400 flex-1">
          <textarea
            rows={5}
            className="text-sm text-white bg-gray-900 rounded-md py-2 px-4 focus:outline-none focus:bg-white focus:text-gray-900 w-full"
            name={name}
            placeholder={placeholder}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
      </div>
      {formik.touched[name] && formik.errors[name] ? (
        <small
          id={name}
          style={{
            marginBottom: "15px",
            fontSize: "12px",
            color: "red",
          }}
        >
          {formik.errors[name]}
        </small>
      ) : null}
    </div>
  );
};

export default CTextArea;
