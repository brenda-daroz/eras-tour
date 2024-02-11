// Fab.js
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const FloatActions = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1;
`;

const FloatingActionButton = styled.button`
  background-color: #625548;
  border: none;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  height: 60px;
  width: 60px;
  font-size: 1.1rem;
  border-radius: 50%;
  display: block;
  color: #edece8;
  text-align: center;
  font-family: "Anonymous Pro", monospace;
  font-weight: 700;

  &:hover {
    background-color: #625548b3;
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
  margin: 10px 0;
  height: 40px;
  width: 40px;
  background-color: blue;
  border-radius: 50%;
  display: block;
  border: none;
  background-color: #edece8;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  border-radius: 50px;
  font-family: "Anonymous Pro", monospace;

  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

const FabYear = ({ options, year }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(year);

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.name);
    option.func();
    setIsOpen(false);
  };

  return (
    <FloatActions ref={containerRef}>
      <FloatingActionButton onClick={handleButtonClick}>
        {selectedOption}
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
