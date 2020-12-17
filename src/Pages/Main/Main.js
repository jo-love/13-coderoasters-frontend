import React from "react";
import { useHistory } from "react-router-dom";
import { GrMoney } from "react-icons/gr";
import "./Main.scss";

const Main = () => {
  const history = useHistory();
  const goToQuiz = () => {
    history.push(`/1`);
  };
  return (
    <div className="MainPage">
      <div className="headerWrapper">
        <div className="offer">
          <GrMoney className="moneyIcon" />
          <p>30% off your first bag + free shipping always</p>
        </div>
        <span> Applied at checkout to any subscription. See terms.</span>
        <div className="mainHeader">
          <h1>Discover Your Best Coffee</h1>
        </div>
        <div className="mainDescription">
          <p>
            Find a personalized selection of coffee <br />
            from the top US roasters.
          </p>
        </div>
        <button onClick={goToQuiz}>TAKE THE QUIZ</button>
      </div>
    </div>
  );
};

export default Main;
