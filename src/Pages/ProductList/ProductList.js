import React from "react";
import Header from "./Components/Header/Header";
import Category from "./Components/Category/Category";
import CardList from "./Components/CardList/CardList";
import styled from "styled-components";

const ProductList = () => {
  return (
    <Wrapper>
      <Header />
      <div className="mainSection">
        <Category />
        <CardList />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 55px;
  .mainSection {
    display: flex;
    width: 90%;
    margin: 0 auto;
  }
`;

export default ProductList;
