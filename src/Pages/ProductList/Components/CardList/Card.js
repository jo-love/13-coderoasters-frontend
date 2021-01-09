import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Card = ({ img, taste, company, name, price, id }) => {
  const history = useHistory();
  return (
    <CardContainer onClick={() => history.push(`/ProductDetails/${id}`)}>
      <div className="imgContainer">
        <img src={img} alt="productImg" />
      </div>
      <div className="taste">
        <h2>{taste}</h2>
      </div>
      <div className="productInfo">
        <h3 className="companyName">{company}</h3>
        <h2>{name}</h2>
        <h3 className="price">{`$${price}`}</h3>
      </div>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  ${({ theme }) => theme.flexcolumn};
  border: ${({ theme }) => theme.border};
  height: 500px;
  cursor: pointer;
  .imgContainer {
    transition: 0.3s ease-in-out;
    height: 400px;
    margin-top: 15px;

    &:hover {
      margin-top: 0;
    }

    img {
      width: 100%;
      height: 300px;
    }
  }
  .taste {
    width: 95%;
    margin: 0 auto;
    padding: 20px 0 20px 10px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.lightgrey};

    h2 {
      color: ${({ theme }) => theme.colors.darkgrey};
      font-size: 22px;
      font-weight: normal;
      font-family: "Fira Sans";
    }
  }
  .productInfo {
    ${({ theme }) => theme.flexcolumn};
    justify-content: center;
    width: 310px;
    height: 130px;
    padding-left: 15px;

    h2,
    h3 {
      height: calc(90% / 3);
      font-family: "Fira Sans";
    }

    .companyName {
      padding-top: 15px;
      font-size: 14px;
      font-weight: normal;
    }

    h2 {
      font-size: 22px;
    }

    .price {
      color: ${({ theme }) => theme.colors.darkgrey};
      font-size: 16px;
    }
  
`;
export default Card;
