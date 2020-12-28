import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AsideItems from "./AsideItems";
import styled from "styled-components";

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

class Category extends Component {
  resetAllItems = () => {
    this.props.history.push("/productlist");
    window.location.reload();
  };

  render() {
    return (
      <CategoryBox>
        <div className="leftBox">
          <span className="boldName">Filter</span>
          <span className="clearBtn" onClick={this.resetAllItems}>
            Clear
          </span>
        </div>
        <AsideItems />
      </CategoryBox>
    );
  }
}

export default withRouter(Category);
