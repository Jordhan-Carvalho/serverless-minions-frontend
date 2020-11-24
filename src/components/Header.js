import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { userContext } from "../contexts/UserContext";

export default function Header() {
  const { user, logOut } = useContext(userContext);

  return (
    <HeaderContainer>
      <Title to="/">Minions Store</Title>
      <NavContainer>
        {user ? (
          <>
            <NavLink to="/orders">My reservations</NavLink>
            <NavLogout onClick={logOut}>Logout</NavLogout>
            <ProfilePic src={user.picture} />
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </NavContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  background: var(--darkBlue);
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  @media (max-width: 768px) {
    height: 70px;
  }
`;

const Title = styled(Link)`
  color: var(--lightYellow);
  font-size: 34px;
  font-weight: bold;
  text-decoration: none;
  padding-left: 10%;
  @media (max-width: 768px) {
    font-size: 26px;
    padding-left: 5%;
  }
`;

const NavContainer = styled.div`
  padding-right: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    padding-right: 5%;
  }
`;

const NavLink = styled(Link)`
  color: var(--lightYellow);
  text-decoration: none;
  font-size: 16px;
  margin-right: 10px;
  @media (max-width: 768px) {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const NavLogout = styled.a`
  color: var(--lightYellow);
  text-decoration: none;
  font-size: 16px;
  margin-right: 10px;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const ProfilePic = styled.img`
  height: 60px;
  width: 60px;
  display: block;
  border-radius: 50%;
  @media (max-width: 768px) {
    height: 25px;
    width: 25px;
  }
`;
