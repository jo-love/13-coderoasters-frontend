import React from "react";
import { useHistory } from "react-router-dom";
import AsideItems from "./AsideItems";
import styled from "styled-components";

const Category = () => {
  const history = useHistory();

  const resetAllItems = () => {
    history.push("/productlist");
    window.location.reload();
  };

  return (
    <CategoryBox>
      <div className="leftBox">
        <span className="boldName">Filter</span>
        <span className="clearBtn" onClick={resetAllItems}>
          Clear
        </span>
      </div>
      <AsideItems />
    </CategoryBox>
  );
};

const CategoryBox = styled.aside`
  width: 30%;
  .leftBox {
    ${({ theme }) => theme.spacebetween};
    align-items: center;
    height: 85px;

    span {
      padding-bottom: 40px;
    }

    .boldName {
      font-family: Fira sans;
      font-size: 22px;
      font-weight: bold;
    }

    .clearBtn {
      margin-right: 40px;
      font-size: 12px;
      font-weight: 800;
      color: ${({ theme }) => theme.colors.darkgrey};
      cursor: pointer;
    }
  }
`;
export default Category;
