import styled from "styled-components";
import { useState } from "react";


const Tab = styled.a`
color : white;
cursor: pointer;
opacity: 0.8;
font-weight: 500;
padding : 5px 15px;
font-size: 0.8rem;
  ${({ active }) =>
    active &&
    `
    border-bottom: 1px solid rgba(0,0,0, 0.5);
    opacity: 1;
    color: #333;

  `}
`;
const ButtonGroup = styled.div`
  margin: 10px 25px;
  display: flex;
  border: 0 5px 0 5px solid #ccc;
  justify-content: space-evenly;
`;
const types = ['Surprise', 'Fixed', 'Unplayed'];

function Tabs({ children }) {
  const [active, setActive] = useState(types[0]);

  return (
    <>
      <ButtonGroup>
        {types.map(type => (
          <Tab
            key={type}
            name={type}
            active={active === type}
            onClick={() => setActive(type)}
          >
            {type.toUpperCase()}
          </Tab>
        ))}
      </ButtonGroup>
      {children.map(child => {
        if (child.name === active) return child.content;
        return null;
      }
      )}
    </>
  );
}

export default Tabs;
