import React from "react";
import Select, { StylesConfig } from "react-select";

type OptionType = {
  label: string;
  value: string;
};

const options: OptionType[] = [
  { value: "recent", label: "Recently Listed" },
  { value: "24h", label: "Last 24 hours" },
  { value: "7d", label: "Last 7 days" },
  { value: "All", label: "All time" },
];

type IsMulti = false;

const customStyles: StylesConfig<OptionType, IsMulti> = {
  indicatorSeparator: () => ({
    display: 'none',
  }),
  control: (provided) => ({
    ...provided,
    minHeight: '45px',
    fontSize: '14px',
    border: '1px solid #E5E5E5',
    boxSizing: 'border-box',
    borderRadius: '4px',
    background: '#fff',
    margin: 0,
  }),
  menu: (provided) => ({
    ...provided,
    fontSize: '1.3rem',
  }),
};

const CSelect = () => {
  return (
    <div className="w-80">
      <Select
        options={options}
        defaultValue={{
          value: "All",
          label: "All time",
        }}

        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary75: '#eb1484 27.35%',
            primary50: '#c91cc3 99.99%',
            primary25: '#c81cc5 100%',
            primary: '#da18a3',
          },
        })}
        styles={customStyles}
      />
    </div>
  );
};

export default CSelect;
