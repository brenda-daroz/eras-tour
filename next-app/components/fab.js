// Fab.js
import React, { useState } from "react";
import styled from "styled-components";

const FloatActions = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FloatingActionButton = styled.button`
  background-color: #007bff;
  border: none;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  height: 60px;
  width: 60px;
  border-radius: 50%;
  display: block;
  color: #fff;
  text-align: center;

  &:hover {
    background-color: #0056b3;
    cursor: pointer;
  }
`;

const OptionsContainer = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  border-radius: 5px;
  padding: 10px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const OptionButton = styled.button`
  margin: 5px 0;
  height: 40px;
  width: 40px;
  background-color: blue;
  border-radius: 50%;
  display: block;
  border: none;
  background-color: white;
  cursor: pointer;
  border-radius: 50px;

  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

const FabYear = ({ options, year }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(year);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.name);
    option.func();
    setIsOpen(false);
  };

  return (
    <FloatActions>
      <FloatingActionButton onClick={handleButtonClick}>
        {selectedOption || "Year"}
      </FloatingActionButton>
      <OptionsContainer isOpen={isOpen}>
        {options.map((option) => (
          <OptionButton
            key={option.name}
            onClick={() => handleOptionClick(option)}
          >
            {option.name}
          </OptionButton>
        ))}
      </OptionsContainer>
    </FloatActions>
  );
};

export default FabYear;
