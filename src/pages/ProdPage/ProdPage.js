import React, { useState, useContext, useEffect } from "react";
import { API } from "aws-amplify";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

import Header from "../../components/Header";
import { userContext } from "../../contexts/UserContext";
import Spinner from "../../components/Spinner";
import LeftPane from "./LeftPane";
import RightPane from "./RightPane";

export default function ProdPage() {
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    imageUrl: "",
    amzId: "",
  });
  const { state } = useLocation();
  const { id } = useParams();
  const history = useHistory();
  const { user } = useContext(userContext);
  const { title, price, description, imageUrl, amzId } = product;

  useEffect(() => {
    if (state) {
      setProduct(state.product);
    } else {
      fetchMinion();
    }
  }, []);

  const fetchMinion = async () => {
    setIsLoading(true);
    try {
      const data = await API.get("minions", `/minions/${id}`);
      setProduct(data);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const descToArray = () => {
    const arr = description
      .split(".")
      .slice(1, 10)
      .map((i) => i.trim());
    return [...new Set(arr)];
  };

  const reserveMinion = async () => {
    if (!user) {
      history.push("/login");
      return;
    }

    if (!window.confirm("Reservar o item?")) return;
    setIsSending(true);
    try {
      // email do user hardcoded por limitacoes do SES, user.email
      await API.post("send-email", "/send-email", {
        body: {
          toUser: "jordhan.rdz@gmail.com",
          toBGC: "thiago@bgcbrasil.com.br",
          from: "carvalho@jordhan.dev",
          subject: "Reservation Confirmed",
          text: `Succesfully reserved ${product.title}`,
        },
      });
      const order = {
        prodTitle: title,
        prodId: amzId,
        prodPrice: price,
        prodPicture: imageUrl,
      };
      await API.post("orders", "/orders", {
        body: order,
      });
      setIsSending(false);
      history.push("/orders");
    } catch (e) {
      console.error(e);
      setIsSending(false);
    }
  };

  return (
    <>
      <Header />
      <MainContainer>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <LeftPane title={title} imageUrl={imageUrl} />
            <RightPane
              isSending={isSending}
              descToArray={descToArray}
              reserveMinion={reserveMinion}
              price={price}
            />
          </>
        )}
      </MainContainer>
    </>
  );
}

const MainContainer = styled.main`
  margin-top: 120px;
  padding: 0 10%;
  padding-bottom: 50px;
  display: flex;
  @media (max-width: 768px) {
    padding: 0 0 50px 0;
    margin-top: 100px;
  }
`;
