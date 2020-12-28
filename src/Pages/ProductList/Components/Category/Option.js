import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled, { css } from "styled-components";

const fontMixed = css`
  font-family: Fira sans;
  font-size: 14px;
`;

const Item = styled.div`
  width: 280px;
  min-height: 80px;
  border-bottom: ${({ theme }) => theme.border};
  .mainCategory {
    min-height: 80px;
    .toggleBtn {
      ${({ theme }) => theme.spacebetween};
      align-items: center;
      width: 100%;
      height: 80px;
      cursor: pointer;
    }
  }
  span {
    ${fontMixed}
  }
  img {
    width: 13px;
    height: 13px;
  }

  .options {
    ${({ theme }) => theme.flexcolumn};
    .option {
      display: flex;
      align-items: center;
      height: 50px;
      padding: 15px;

      input {
        width: 30px;
        height: 20px;
        margin-right: 10px;
        cursor: pointer;
      }

      label {
        font-size: 13px;
      }
    }
    .seeAllBox {
      height: 50px;
      color: ${({ theme }) => theme.colors.darkgrey};
      ${fontMixed};
      text-align: center;
      cursor: pointer;
    }
  }
`;

class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      hidden: props.filter_options.length > 5,
      filterOptions: props.filter_options.slice(0, 5),
    };
  }

  clickHandle = () => {
    this.setState({
      isClicked: !this.state.isClicked,
      hidden: this.props.filter_options.length > 5 ? true : false,
    });
  };

  showHidden = () => {
    this.setState({ filterOptions: this.props.filter_options, hidden: false });
  };

  refreshLists = () => {
    this.setState({
      filterOptions: this.props.filter_options.slice(0, 5),
    });
  };

  filterQueryKey = (e, listName, name) => {
    let queryKey = "";
    if (
      listName === "Region" ||
      listName === "Country" ||
      listName === "Process" ||
      listName === "Decaf" ||
      listName === "Espresso" ||
      listName === "Type" ||
      listName === "Roaster"
    ) {
      queryKey = `${listName}[]=`;
      this.filterQueryValue(e, listName, name, queryKey);
    }

    if (
      listName === "Roast Level" ||
      listName === "Cold Brew" ||
      listName === "Coffee Tastes Like" ||
      listName === "Bag Weight" ||
      listName === "Available Ground"
    ) {
      queryKey = `${listName.replaceAll(" ", "_").toLowerCase()}[]=`;
      this.filterQueryValue(e, listName, name, queryKey);
    }

    if (listName === "Price") {
      queryKey = `price_bucket[]=`;
      this.filterQueryValue(e, listName, name, queryKey);
    }
  };

  filterQueryValue = (e, listName, name, value) => {
    if (listName === "Price") {
      if (name === "Less than $15") {
        this.updateQueryString(e, `${value}1&`);
      }
      if (name === "$15 - $18") {
        this.updateQueryString(e, `${value}2&`);
      }
      if (name === "$18- $22") {
        this.updateQueryString(e, `${value}3&`);
      }
      if (name === "More than $22") {
        this.updateQueryString(e, `${value}4&`);
      }
    }
    if (
      listName === "Roast Level" ||
      listName === "Coffee Tastes Like" ||
      listName === "Country" ||
      listName === "Region" ||
      listName === "Process" ||
      listName === "Bag Weight" ||
      listName === "Type" ||
      listName === "Roaster"
    ) {
      this.updateQueryString(e, `${value + name.replaceAll(" ", "+")}&`);
    }

    if (
      listName === "Cold Brew" ||
      listName === "Decaf" ||
      listName === "Espresso" ||
      listName === "Available Ground"
    ) {
      this.updateQueryString(e, `${value}1&`);
    }
  };

  updateQueryString = (e, query) => {
    if (e.target.checked) {
      this.props.makeUrl(query);
    } else {
      this.props.deleteQuery(query);
    }
  };

  render() {
    const { isClicked, filterOptions, hidden } = this.state;
    const { name } = this.props;
    return (
      <Item>
        <div className="mainCategory">
          {!isClicked && (
            <div className="toggleBtn" onClick={this.clickHandle}>
              <span>{name}</span>
              <img src="/Images/add.png" alt="toggle" />
            </div>
          )}
          {isClicked && (
            <div
              className="toggleBtn"
              onClick={() => {
                this.clickHandle();
                this.refreshLists();
              }}
            >
              <span>{name}</span>
              <img src="/Images/minus.png" alt="toggle" />
            </div>
          )}
        </div>
        {isClicked && (
          <div className="options">
            {filterOptions.map((option) => (
              <div className="option">
                <input
                  onChange={(e) => {
                    this.filterQueryKey(e, name, option.name);
                  }}
                  type="checkbox"
                />
                <label>{option.name}</label>
              </div>
            ))}
            {hidden && (
              <div className="seeAllBox" onClick={this.showHidden}>
                See All
              </div>
            )}
          </div>
        )}
      </Item>
    );
  }
}

export default withRouter(Option);
