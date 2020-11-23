import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// import UserContext from "../../contexts/UserContext";
import styled from "styled-components";
import Spinner from "../../components/Spinner";

export default function Form({ formState, handleChangeFormState }) {
  // const { signIn, signUp } = useContext(UserContext);
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const sendLoginInfo = async (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      alert("Preencha todos os campos");
      return;
    }
    console.log("Entrou");
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0 || pictureUrl === 0) {
      alert("Preencha todos os campos");
      return;
    }
  };

  const login = formState === "login";

  if (loading) return <Spinner />;

  return (
    <FormContainer onSubmit={login ? sendLoginInfo : registerUser}>
      <input
        placeholder="e-mail"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      {!login && (
        <input
          placeholder="picture url"
          type="url"
          onChange={(e) => setPictureUrl(e.target.value)}
          value={pictureUrl}
        />
      )}
      <Button disabled={loading} type="submit">
        {login ? "Log In" : "Sign Up"}
      </Button>
      <ChangeFormButton onClick={handleChangeFormState}>
        {login ? "First time? Create an account!" : "Switch back to log in"}
      </ChangeFormButton>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85%;
  @media (max-width: 768px) {
    margin: 20px 0;
  }
  input {
    width: 100%;
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 20px 10px;
    margin-bottom: 10px;
    @media (max-width: 768px) {
      padding: 15px 10px;
    }
  }
  input::placeholder {
    color: #9f9f9f;
    font-weight: 700;
    font-size: 27px;
    @media (max-width: 768px) {
      font-size: 22px;
    }
  }
`;

const Button = styled.button`
  width: 100%;
  background: var(--lightYellow);
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 15px 5px;
  color: var(--darkBlue);
  font-size: 27px;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const ChangeFormButton = styled.p`
  text-decoration: underline;
  font-size: 20px;
  margin-top: 20px;
  cursor: pointer;
  color: var(--lightYellow);
  @media (max-width: 768px) {
    font-size: 17px;
  }
`;
