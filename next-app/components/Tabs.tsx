import React from "react";
import styled from "styled-components";
import { useState } from "react";

const Tab = styled.li<{ $active: boolean }>`
  color: grey;
  list-style: none;
  cursor: pointer;
  opacity: 0.8;
  font-weight: 500;
  padding: 5px 15px;
  font-size: 0.8rem;
  margin: 0 5px;
  border-bottom: 1px solid transparent;
  ${({ $active }) =>
    $active &&
    `
    border-bottom: 1px solid rgba(0,0,0, 0.5);
    opacity: 1;
    color: #333;
    transition: 0.5s ease;

  `}
  @media only screen and (min-width: 1600px) {
    font-size: 1.1rem;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 1.1rem;
  }
`;
const ButtonGroup = styled.ul`
  margin: 0;
  display: flex;
  border: 0 5px 0 5px solid #ccc;
  justify-content: space-evenly;
  padding: 5px 0px;
  background-color: #d3d3d3;
  opacity: 0.6;
  box-shadow: 0px 9px 24px -3px rgba(0, 0, 0, 0.3);
`;

type Tab = {
  name: string;
  content: React.ReactNode;
};

function Tabs({ tabs }: { tabs: Array<Tab> }) {
  const [selectedTabName, setSelectedTabName] = useState(tabs[0].name);
  const selectedTab = tabs.find((tab) => tab.name === selectedTabName);
  if (!selectedTab) return;

  return (
    <>
      <ButtonGroup>
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            $active={selectedTabName === tab.name}
            onClick={() => setSelectedTabName(tab.name)}
          >
            {tab.name.toUpperCase()}
          </Tab>
        ))}
      </ButtonGroup>
      {selectedTab.content}
    </>
  );
}

export default Tabs;
