import React from "react";
import styled from "styled-components";

import minions from "../assets/minions404.png";
import Header from "../components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <ContainerDiv>
        <Title>404</Title>
        <SubTitle>Page not found</SubTitle>
        <Image404 src={minions} alt="404" />
      </ContainerDiv>
    </>
  );
}

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 150px;
  padding: 20px;
`;

const Image404 = styled.img`
  width: 35%;
  display: block;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: bold;
  color: var(--darkYellow);
  @media (max-width: 768px) {
    font-size: 50px;
  }
`;

const SubTitle = styled.h2`
  font-size: 40px;
  font-weight: bold;
  color: var(--darkBlue);
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
