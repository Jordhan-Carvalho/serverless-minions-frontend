import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import styled from "styled-components";

import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchMinions();
  }, []);

  const fetchMinions = async () => {
    setIsLoading(true);
    try {
      const data = await API.get("minions", "/minions");
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const truncate = (input) =>
    input.length > 5 ? `${input.substring(0, 60)}...` : input;

  return isLoading ? (
    <Spinner />
  ) : (
    <ProdListContainer>
      {products.map((p, i) => (
        <ProdContainer
          key={i}
          to={{
            pathname: `/minion/${p.amzId}`,
            state: { product: p },
          }}
        >
          <ProdImage src={p.imageUrl} />

          <ProdTitle>{truncate(p.title)}</ProdTitle>
          <ProdPrice>R{p.price}</ProdPrice>
        </ProdContainer>
      ))}
    </ProdListContainer>
  );
}

const ProdListContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 80px;
`;

const ProdContainer = styled(Link)`
  padding: 10px;
  height: 300px;
  width: 260px;
  background: white;
  margin-right: 10px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 5px 1px var(--darkBlue);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
`;

const ProdImage = styled.img`
  display: block;
  height: 150px;
  border-bottom: 1px dashed var(--lightYellow);
`;

const ProdTitle = styled.h3`
  font-weight: bold;
  word-break: break-all;
  text-overflow: ellipsis;
`;

const ProdPrice = styled.p`
  font-weight: 100;
`;
