import React from "react";
import styled from "styled-components";

export default function LeftPane({ title, imageUrl }) {
  return (
    <Container>
      <Title>{title}</Title>
      <ProductImage src={imageUrl} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  overflow: hidden;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 26px;
  color: var(--darkYellow);
  margin-bottom: 40px;
  @media (max-width: 768px) {
    margin: 0 20px 20px 20px;
    font-size: 20px;
  }
`;

const ProductImage = styled.img`
  display: block;
  width: 90%;
`;
