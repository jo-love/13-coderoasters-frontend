import React, { Component } from "react";
import Option from "./Option";
import { withRouter } from "react-router-dom";
import { APIProductOptions } from "../../../../../src/config";
import styled from "styled-components";

const ItemContainer = styled.div`
  ${({ theme }) => theme.flexcolumn};
  justify-items: center;
  width: 300px;
  border-top: ${({ theme }) => theme.border};
`;
class AsideItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: "",
      queryString: [],
    };
  }

  componentDidMount() {
    fetch(`${APIProductOptions}`)
      .then((res) => res.json())
      .then((res) => this.setState({ menuList: res }));
  }

  makeUrl = (query) => {
    this.setState(
      {
        queryString: [...this.state.queryString, query],
      },
      () => this.props.history.push(`?${this.state.queryString.join("")}`)
    );
  };

  deleteQuery = (name) => {
    const findTargetword = this.state.queryString.filter(
      (item) => item !== name
    );
    this.setState(
      {
        queryString: findTargetword,
      },
      () => this.props.history.push(`?${this.state.queryString.join("")}`)
    );
  };

  render() {
    const { menuList } = this.state;
    return (
      <div>
        <ItemContainer>
          {menuList &&
            menuList.foundOptions.map((list) => (
              <Option
                key={list.id}
                name={list.name}
                filter_options={list.filter_options}
                makeUrl={this.makeUrl}
                deleteQuery={this.deleteQuery}
              />
            ))}
        </ItemContainer>
      </div>
    );
  }
}

export default withRouter(AsideItems);
