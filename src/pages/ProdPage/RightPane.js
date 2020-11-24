import React from "react";
import styled from "styled-components";

export default function RightPane({
  reserveMinion,
  isSending,
  price,
  descToArray,
}) {
  return (
    <Container>
      <TopicHeader>Description</TopicHeader>
      {descToArray().map((d, i) => (
        <DescItem key={i}>• {d}</DescItem>
      ))}

      <Price>R{price}</Price>
      <Button onClick={reserveMinion} disabled={isSending}>
        {isSending ? "Reserving...please wait." : "Reserve"}
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  overflow: hidden;
`;

const Price = styled.h3`
  font-weight: 300;
  font-size: 26px;
  color: var(--darkYellow);
  margin: 20px 0;
`;

const DescItem = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  color: var(--darkBlue);
`;

const TopicHeader = styled.h3`
  font-weight: bold;
  font-size: 26px;
  color: var(--darkYellow);
  margin-bottom: 30px;
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
  cursor: pointer;
  margin-top: 20px;
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;
