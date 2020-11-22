import React from "react";
import styled from "styled-components";

import Header from "../../components/Header";
import minions from "../../assets/minions-tbackground.png";

export default function HomePage() {
  return (
    <>
      <Header />
      <MainContainer>
        <Banner />
      </MainContainer>
    </>
  );
}

const MainContainer = styled.main`
  margin-top: 80px;
  height: calc(100% - 80px);
  min-height: 100vh;
  padding: 0 10%;
  padding-bottom: 50px;
  @media (max-width: 768px) {
    padding: 0 0 50px 0;
  }
`;

const Banner = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${minions});
  background-size: contain;
  background-repeat: repeat-x;
`;