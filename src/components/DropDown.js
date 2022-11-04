
import React from "react";
import Select from "react-select";
export const languageOptions = [
    {
      id: 63,
      name: "Java",
      label: "Java",
      value: "java",
    },
    {
      id: 75,
      name: "C",
      label: "C",
      value: "c",
    },
    {
      id: 76,
      name: "C++",
      label: "C++",
      value: "cpp",
    },
    {
      id: 70,
      name: "Python",
      label: "Python",
      value: "python",
    },
  ];
  
const LanguagesDropdown = ({ onSelectChange }) => {
    return (
      <Select
        placeholder={`Filter By Category`}
        options={languageOptions}
        defaultValue={languageOptions[3]}
        onChange={(selectedOption) => onSelectChange(selectedOption)}
      />
    );
  };
  
  export default LanguagesDropdown;
  