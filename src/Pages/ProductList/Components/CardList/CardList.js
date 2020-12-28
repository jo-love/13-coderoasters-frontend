import React, { Component } from "react";
import Card from "../CardList/Card";
import { APIProductList } from "../../../../../src/config";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const CardListBox = styled.main`
  width: 75%;
  .rightBox {
    ${({ theme }) => theme.spacebetween};
    align-items: baseline;
    div {
      display: flex;
      align-items: center;
      font-size: 15px;
    }
    .rightText {
      padding-bottom: 45px;
      select {
        width: 150px;
        height: 40px;
        margin-left: 20px;
        padding-left: 10px;
        border: ${({ theme }) => theme.border};
        border-radius: 5px;

        option {
          padding: 10px 0;
        }
      }
    }
  }
  .listSection {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
  }
  .btnWrapper {
    text-align: center;

    button {
      width: 140px;
      height: 43px;
      margin: 50px 0;
      border-radius: 5px;
      color: ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors.btnColor};
      curson: pointer;
    }
  }
`;
class CardList extends Component {
  constructor() {
    super();
    this.state = {
      filteredCoffeeList: [],
      offset: 1,
      orderBy: "",
      show: true,
      filteredCoffeeCount: 0,
    };
  }

  componentDidMount() {
    fetch(`${APIProductList}`)
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          filteredCoffeeList: res.filteredCoffeeList,
          filteredCoffeeCount: res.filteredCoffeeCount,
          show: true,
        })
      );
  }

  LoadMoreItems = () => {
    const { offset, orderBy, filteredCoffeeList } = this.state;
    const nextOffset = offset + 1;
    let query = this.props.location.search;
    if (query === "") query = "?";
    fetch(`${APIProductList}${query}page=${nextOffset}&order_by=${orderBy}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          filteredCoffeeList: [
            ...filteredCoffeeList,
            ...res.filteredCoffeeList,
          ],
          show: res.filteredCoffeeList.length < 18 ? false : true,
        });
      });
    this.setState({ offset: nextOffset });
  };

  showValue = (e) => {
    let query = this.props.location.search;
    if (query === "") query = "?";
    fetch(`${APIProductList}${query}order_by=${e.target.value}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          filteredCoffeeList: res.filteredCoffeeList,
          filteredCoffeeCount: res.filteredCoffeeCount,
          orderBy: e.target.value,
          offset: 1,
          show: res.filteredCoffeeList.length < 18 ? false : true,
        });
      });
  };

  componentDidUpdate(prevProps) {
    console.log(this.props.location.search);
    if (prevProps.location.search !== this.props.location.search) {
      fetch(`${APIProductList}${this.props.location.search}`)
        .then((res) => res.json())
        .then((res) => {
          this.setState({
            filteredCoffeeCount: res.filteredCoffeeCount,
            filteredCoffeeList: res.filteredCoffeeList,
            offset: 1,
            show: res.filteredCoffeeList.length < 18 ? false : true,
          });
        });
    }
  }

  render() {
    const { filteredCoffeeList, filteredCoffeeCount } = this.state;
    return (
      <CardListBox>
        <div className="rightBox">
          <div>
            <span>{filteredCoffeeCount}&nbsp;</span>
            <span>coffees</span>
          </div>
          <div className="rightText">
            <label className="boldName">Sort</label>
            <select onChange={this.showValue}>
              <option value="popularity">Most Popular</option>
              <option value="new">New</option>
              <option value="price">Highest Price</option>
              <option value="-price">Lowest Price</option>
            </select>
          </div>
        </div>
        <div className="listSection">
          {filteredCoffeeList.map((product) => {
            return (
              <Card
                id={product.id}
                img={product.image_url}
                taste={product.coffees.taste}
                company={product.company}
                name={product.name}
                price={product.price}
                key={product.id}
              />
            );
          })}
        </div>
        {this.state.show && (
          <div className="btnWrapper">
            <button onClick={this.LoadMoreItems}>LOAD MORE</button>
          </div>
        )}
      </CardListBox>
    );
  }
}
export default withRouter(CardList);
