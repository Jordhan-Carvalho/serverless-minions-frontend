import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { userContext } from "../contexts/UserContext";

export default function Header() {
  const { user, logOut } = useContext(userContext);

  console.log(user.picture);
  return (
    <HeaderContainer>
      <Title to="/">Minions Store</Title>
      <NavContainer>
        {user ? (
          <>
            <ProfilePic src={user.picture} />
            <NavLink to="/">Minhas reservas</NavLink>
            <NavLogout onClick={logOut}>Logout</NavLogout>
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
`;

const Title = styled(Link)`
  color: var(--lightYellow);
  font-size: 34px;
  font-weight: bold;
  text-decoration: none;
  padding-left: 10%;
`;

const NavContainer = styled.div`
  padding-right: 10%;
`;

const NavLink = styled(Link)`
  color: var(--lightYellow);
  text-decoration: none;
  font-size: 16px;
  margin-left: 10px;
`;

const NavLogout = styled.a`
  color: var(--lightYellow);
  text-decoration: none;
  font-size: 16px;
  margin-left: 10px;
  cursor: pointer;
`;

const ProfilePic = styled.img`
  height: 50px;
  width: 50px;
`;
