import React from "react";
import styled, { keyframes } from "styled-components";

const Loading = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const dot = keyframes`
  0% { background-color: rgba(163, 39, 245, 0.8); transform: scale(1); }
  50% { background-color: rgba(163, 39, 245, 0.5); transform: scale(1.4); }
  100% { background-color: rgba(163, 39, 245, 0.2); transform: scale(1); }
`;

const LoadingDot = styled.span`
  animation: ${dot} ease-in-out 1s infinite;
  background-color: grey;
  display: inline-block;
  height: 20px;
  margin: 10px;
  width: 20px;
  border-radius: 50%;
  &:nth-of-type(2) {
    animation-delay: 0.2s;
  }
  &:nth-of-type(3) {
    animation-delay: 0.3s;
  }
`;

function Loader() {
  return (
    <Loading>
      <LoadingDot className="loading__dot"></LoadingDot>
      <LoadingDot className="loading__dot"></LoadingDot>
      <LoadingDot className="loading__dot"></LoadingDot>
    </Loading>
  );
}

export default Loader;
