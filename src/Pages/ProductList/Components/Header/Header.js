import React from "react";
// import { withRouter } from "react-router-dom";
import styled from "styled-components";

const HeaderBox = styled.header`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const Title = styled.span`
  font-size: 12px;
  font-weight: ${(props) => props.weight};
`;

const Name = styled.p`
  display: flex;
  align-items: center;
  height: 150px;
  font-family: Fira sans;
  font-weight: 700;
  font-size: 90px;
  color: $default-red;
`;

const Description = styled.p`
  line-height: 20px;
`;

const Header = () => {
  return (
    <HeaderBox>
      <div>
        <Title weight="bold">coffee</Title>
        <Title>> All coffee</Title>
      </div>
      <div>
        <Name>All Coffee</Name>
        <Description>
          choose from a wide variety of coffee from the top roasters in the US.
          All coffee is
          <br /> roasted to order and shipped fresh to your door.
        </Description>
      </div>
    </HeaderBox>
  );
};

export default Header;
