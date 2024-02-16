import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

const pulsate = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const FloatActions = styled.div`
  position: fixed;
  bottom: 15px;
  right: 20px;
  z-index: 1;
`;

const FloatingActionButton = styled.button`
  background-color: #b30012;
  border: none;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  height: 60px;
  width: 60px;
  font-size: 1.1rem;
  border-radius: 50%;
  display: block;

  text-align: center;
  font-family: "Anonymous Pro", monospace;
  font-weight: 700;
  p {
    color: #fff;
    text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  }

  ${({ isClicked }) =>
    !isClicked &&
    css`
      animation: ${pulsate} 2s infinite;
    `} /* Apply pulsating animation only if button is not clicked */
  &:hover {
    background-color: #b30012b3;
    cursor: pointer;
    animation: none; /* Disable animation on hover */
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
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  border-radius: 50px;
  font-family: "Anonymous Pro", monospace;
  p {
    color: #b30012;
    text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    font-weight: 700;
  }

  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

const FabYear = ({ options, year }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(year);
  const [isClicked, setIsClicked] = useState(false); // Track whether button is clicked

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
    setIsClicked(true); // Set isClicked to true on first click
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.name);
    option.func();
    setIsOpen(false);
  };

  return (
    <FloatActions ref={containerRef}>
      <FloatingActionButton onClick={handleButtonClick} isClicked={isClicked}>
        <p>{selectedOption}</p>
      </FloatingActionButton>
      <OptionsContainer isOpen={isOpen}>
        {options.map((option) => (
          <OptionButton
            key={option.name}
            onClick={() => handleOptionClick(option)}
          >
            <p> {option.name}</p>
          </OptionButton>
        ))}
      </OptionsContainer>
    </FloatActions>
  );
};

export default FabYear;
