import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { truncate } from "../utils/helperFunctions";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    setIsLoading(true);
    try {
      const data = await API.get("orders", "/orders");
      setOrders(data);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <MainContainer>
        {isLoading ? (
          <Spinner />
        ) : (
          orders.map((o, i) => (
            <OrderContainer key={i} to={`/minion/${o.prodId}`}>
              <Picture src={o.prodPicture} />
              <Title>{truncate(o.prodTitle, 50)}</Title>
              <Title>{o.prodPrice}</Title>
            </OrderContainer>
          ))
        )}
      </MainContainer>
    </>
  );
}

const MainContainer = styled.main`
  margin-top: 120px;
  padding: 0 10%;
  padding-bottom: 50px;
  @media (max-width: 768px) {
    padding: 0 2%;
    margin-top: 100px;
  }
`;

const OrderContainer = styled(Link)`
  border: 1px solid var(--darkYellow);
  border-radius: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-right: 20px;
  text-decoration: none;
  @media (max-width: 768px) {
    font-size: 22px;
    width: 90%;
  }
`;

const Picture = styled.img`
  height: 100px;
  width: 100px;
  display: block;
  border: 1px solid var(--darkYellow);
  margin-right: 10px;
  @media (max-width: 768px) {
    height: 70px;
    width: 70px;
  }
`;

const Title = styled.h3`
  font-size: 16px;
  color: var(--darkBlue);
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
