import React, { useState, useContext } from "react";
import { Auth, Storage } from "aws-amplify";
import styled from "styled-components";

import Spinner from "../../components/Spinner";
import { userContext } from "../../contexts/UserContext";
import { s3Upload } from "../../utils/awsConfig";

export default function Form({ formState, handleChangeFormState }) {
  const { setUser } = useContext(userContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState("");

  const sendLoginInfo = async (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      alert("Preencha todos os campos");
      return;
    }
    setIsLoading(true);

    try {
      const { attributes } = await Auth.signIn(email, password);
      const url = await Storage.get(attributes.picture);
      setUser({ ...attributes, picture: url });
      setIsLoading(false);
    } catch (e) {
      alert(e.message);
      console.error(e);
      setIsLoading(false);
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!validateSignUp()) return;

    setIsLoading(true);
    try {
      const picKey = file ? await s3Upload(file) : null;
      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          picture: picKey,
        },
      });
      await sendLoginInfo(e);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const validateSignUp = () => {
    if (email.length === 0 || password.length === 0 || !file) {
      alert("Preencha todos os campos");
      return false;
    }
    if (file && file.size > 1000000) {
      alert(`Please pick a file smaller than ${1000000 / 1000000} MB.`);
      return false;
    }
    return true;
  };

  const login = formState === "login";

  if (isLoading) return <Spinner />;

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
        <>
          <label style={{ marginTop: 10 }} for="file">
            Choose a profile picture (Click me)
          </label>
          <input
            name="file"
            accept=".jpg, .jpeg, .png"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </>
      )}
      <Button disabled={isLoading} type="submit">
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
