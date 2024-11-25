import React from "react";
import styled, { css } from "styled-components";
import { useState } from "react";

const Tab = styled.li<{ $active: boolean, $customStyles?: string }>`
  color: grey;
  list-style: none;
  cursor: pointer;
  opacity: 0.9;
  font-weight: 700;
  padding: 5px 15px;
  font-size: 0.9rem;
  margin: 0 5px;
  border-bottom: 1px solid transparent;
  ${({ $active }) =>
    $active &&
    `
    border-bottom: 2px solid rgba(0,0,0, 0.5);
    opacity: 1;
    color: black;
    transition: 0.5s ease;

  `}
   ${({ $customStyles }) =>
    $customStyles &&
    css`
      ${$customStyles}
    `}
  @media only screen and (min-width: 1600px) {
    font-size: 1.1rem;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 1.1rem;
  }
`;

const ButtonGroup = styled.ul<{ $layout?: string }>`
  margin: 0;
  display: flex;
  justify-content: space-evenly;
  padding: 5px 0px;
  background-color: #d3d3d3;
  opacity: 0.6;
  box-shadow: 0px 9px 24px -3px rgba(0, 0, 0, 0.3);

  ${({ $layout }) =>
    $layout === "horizontal" &&
    `
    padding: 10px;
  `}

   ${({ $layout }) =>
    $layout === "mobile" &&
    `
    background-color: white;
    box-shadow: none;
    align-items: flex-start;
    padding: 10px;
    border-radius: 0;
    flex-wrap: wrap;
  `}
`;

type Tab = {
  name: string;
  content: React.ReactNode;
  customTabStyles?: string;
};

type TabsProps = {
  tabs: Array<Tab>;
  layout?: "horizontal" | "mobile";
  customTabStyles?: string;
};

function Tabs({ tabs, layout = "horizontal", customTabStyles }: TabsProps) {
  const [selectedTabName, setSelectedTabName] = useState(tabs[0].name);
  const selectedTab = tabs.find((tab) => tab.name === selectedTabName);
  if (!selectedTab) return;

  return (
    <>
      <ButtonGroup $layout={layout}>
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            $active={selectedTabName === tab.name}
            onClick={() => setSelectedTabName(tab.name)}
            $customStyles={customTabStyles}
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
