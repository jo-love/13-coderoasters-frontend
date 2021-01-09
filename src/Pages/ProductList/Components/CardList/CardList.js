import React, { useEffect, useState } from "react";
import Card from "../CardList/Card";
import { APIProductList } from "../../../../../src/config";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const CardList = () => {
  const [filteredCoffeeList, setFilteredCoffeeList] = useState([]);
  const [filteredCoffeeCount, setFilteredCoffeeCount] = useState(0);
  const [offset, setOffset] = useState(1);
  const [orderBy, setOrderBy] = useState("");
  const [show, setShow] = useState(true);
  const [url, setUrl] = useState("");
  const location = useLocation();

  useEffect(() => {
    fetch(`${APIProductList}`)
      .then((res) => res.json())
      .then((res) => {
        setFilteredCoffeeList(res.filteredCoffeeList);
        setFilteredCoffeeCount(res.filteredCoffeeCount);
        setShow(true);
      });
  }, []);

  useEffect(() => {
    console.log(location.search);
    if (url !== location.search) {
      fetch(`${APIProductList}${location.search}`)
        .then((res) => res.json())
        .then((res) => {
          setFilteredCoffeeList(res.filteredCoffeeList);
          setFilteredCoffeeCount(res.filteredCoffeeCount);
          setOffset(1);
          setShow(res.filteredCoffeeList.length < 18 ? false : true);
          console.log("count", res.filteredCoffeeCount);
        });
    }
    setUrl(location.search);
  }, [location.search, url]);

  const loadMore = () => {
    const nextOffset = offset + 1;
    let query = location.search;
    if (query === "") query = "?";
    fetch(`${APIProductList}${query}page=${nextOffset}&order_by=${orderBy}`)
      .then((res) => res.json())
      .then((res) => {
        setFilteredCoffeeList([
          ...filteredCoffeeList,
          ...res.filteredCoffeeList,
        ]);
        setShow(res.filteredCoffeeList.length < 18 ? false : true);
      });
  };
  const showValue = (e) => {
    let query = location.search;
    if (query === "") query = "?";
    fetch(`${APIProductList}${query}order_by=${e.target.value}`)
      .then((res) => res.json())
      .then((res) => {
        setFilteredCoffeeList(res.filteredCoffeeList);
        setFilteredCoffeeCount(res.setFilteredCoffeeCount);
        setOrderBy(e.target.value);
        setOffset(1);
        setShow(res.filteredCoffeeList.length < 18 ? false : true);
      });
  };

  return (
    <CardListBox>
      <div className="rightBox">
        <div>
          <span>{filteredCoffeeCount}&nbsp;</span>
          <span>coffees</span>
        </div>
        <div className="rightText">
          <label className="boldName">Sort</label>
          <select onChange={showValue}>
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
      {show && (
        <div className="btnWrapper">
          <button onClick={loadMore}>LOAD MORE</button>
        </div>
      )}
    </CardListBox>
  );
};

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
export default CardList;
