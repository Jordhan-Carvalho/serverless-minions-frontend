import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { userContext } from "../../contexts/UserContext";
import Form from "./Form";

export default function LoginPage() {
  const [formState, setFormState] = useState("login");
  const { user } = useContext(userContext);
  const history = useHistory();

  const handleChangeFormState = () => {
    formState === "login" ? setFormState("signup") : setFormState("login");
  };

  if (user) history.push("/");
  return (
    <MainContainer>
      <LeftContainer>
        <div>
          <LogoTitle>Minions Store</LogoTitle>
          <Subtitle>
            explore, reserve and discover <br /> the best minion toys on the web
          </Subtitle>
        </div>
      </LeftContainer>
      <RightContainer>
        <Form
          formState={formState}
          handleChangeFormState={handleChangeFormState}
        />
      </RightContainer>
    </MainContainer>
  );
}

const MainContainer = styled.main`
  display: flex;
  height: 100vh;
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftContainer = styled.section`
  width: 65%;
  height: 100%;
  background: var(--lightYellow);
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    z-index: 1;
  }
`;

const LogoTitle = styled.h1`
  font-weight: 700;
  font-size: 106px;
  color: var(--darkBlue);
  @media (max-width: 768px) {
    font-size: 76px;
  }
`;

const Subtitle = styled.h2`
  font-weight: 700;
  font-size: 43px;
  color: var(--darkBlue);
  @media (max-width: 768px) {
    font-size: 23px;
  }
`;

const RightContainer = styled.section`
  width: 35%;
  height: 100%;
  background: var(--darkBlue);
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 0;
  }
`;
