import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { APIQuiz } from "../../config";
import QuizComponents from "./QuizComponents";
import "./Quiz.scss";

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      quiz_data: [],
      answers: [],
      answerIdx: 1,
    };
  }

  handleAnswer = (title) => {
    this.setState(
      {
        answers: [...this.state.answers, title],
        answerIdx: this.state.answerIdx + 1,
      },
      () => {
        if (this.state.answerIdx === 5) {
          fetch(`${APIQuiz}`, {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((res) =>
              this.props.history.push(`/productdetails/${res.foundProductID}`)
            );
        } else this.props.history.push(`/${this.state.answerIdx}`);
      }
    );
  };

  componentDidMount() {
    const { quizNums } = this.props.match.params;
    fetch(`http://localhost:3000/Data/Quizdata.json`)
      .then((Quizdata) => Quizdata.json())
      .then((Quizdata) =>
        this.setState({
          quiz_data: Quizdata.quiz_data.filter(
            (el) => el.id === Number(quizNums)
          ),
        })
      );
  }

  componentDidUpdate(prevProps) {
    const { quizNums } = this.props.match.params;
    const prevId = prevProps.match.params.quizNums;
    if (quizNums !== prevId) {
      fetch(`http://localhost:3000/Data/Quizdata.json`)
        .then((Quizdata) => Quizdata.json())
        .then((Quizdata) => {
          this.setState({
            quiz_data: Quizdata.quiz_data.filter(
              (el) => el.id === Number(quizNums)
            ),
          });
        });
    }
  }

  render() {
    const { quiz_data } = this.state;
    return (
      <div className="quizContents">
        {quiz_data.map((quiz_data) => {
          return (
            <QuizComponents
              handleAnswer={this.handleAnswer}
              key={quiz_data.id}
              id={quiz_data.id}
              title={quiz_data.title}
              img={quiz_data.img}
              cards={quiz_data.cards}
              contents={quiz_data.contents}
            />
          );
        })}
      </div>
    );
  }
}
export default withRouter(Quiz);
