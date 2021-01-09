import React, { useEffect, useState } from "react";
import Option from "./Option";
import { useHistory } from "react-router-dom";
import { APIProductOptions } from "../../../../../src/config";
import styled from "styled-components";

const AsideItems = () => {
  const [menuList, setMenulist] = useState("");
  const [queryString, setQuerystring] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch(`${APIProductOptions}`)
      .then((res) => res.json())
      .then((res) => setMenulist(res));
  }, []);
  // 벨로그 기억에 남는 코드에 넣기

  const makeUrl = (query) => {
    setQuerystring([...queryString, query]);
  };

  const deleteUrl = (name) => {
    const findTargetword = queryString.filter((item) => item !== name);
    setQuerystring(findTargetword);
  };

  useEffect(() => {
    history.push(`?${queryString.join("")}`);
  }, [queryString, history]);

  return (
    <div>
      <ItemContainer>
        {menuList &&
          menuList.foundOptions.map((list) => (
            <Option
              key={list.id}
              name={list.name}
              filter_options={list.filter_options}
              makeUrl={makeUrl}
              deleteUrl={deleteUrl}
            />
          ))}
      </ItemContainer>
    </div>
  );
};
const ItemContainer = styled.div`
  ${({ theme }) => theme.flexcolumn};
  justify-items: center;
  width: 300px;
  border-top: ${({ theme }) => theme.border};
`;

export default AsideItems;
