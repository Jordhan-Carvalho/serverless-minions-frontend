import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  return (
    <HeaderContainer>
      <Title to="/">Minions Store</Title>
      <NavContainer>
        <NavLink to="/login">Login</NavLink>
      </NavContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  background: var(--darkBlue);
  height: 80px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;
  position: fixed;
  top: 0;
`;

const Title = styled(Link)`
  color: var(--lightYellow);
  font-size: 34px;
  font-weight: bold;
  text-decoration: none;
`;

const NavContainer = styled.div`
  width: 30%;
`;

const NavLink = styled(Link)`
  color: var(--lightYellow);
  text-decoration: none;
  font-size: 20px;
`;
