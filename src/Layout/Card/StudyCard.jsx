import React, { useState } from "react";
import NextButton from "./NextButton";

export default function StudyCard({ cards }) {
  const [cardNum, setCardNum] = useState(0);
  const [flip, setFlip] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  let content = "";

  if (flip) {
    if (cards.length !== 0) {
      content = cards[cardNum].back;
    }
  } else {
    if (cards.length !== 0) {
      content = cards[cardNum].front;
    }
  }
  if (cards.length !== 0) {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex  justify-content-between ">
            <h5 className="card-title">{`Card ${cardNum + 1} of ${
              cards.length
            } `}</h5>
          </div>
          <p>{content}</p>
          <button
            className="btn btn-secondary ml-1 oi oi-arrow-thick-top"
            onClick={() => {
              setFlip(!flip);
              setIsVisible(!isVisible);
            }}
          >
            Flip
          </button>
          {isVisible ? (
            <NextButton
              flip={flip}
              setFlip={setFlip}
              length={cards.length}
              cardNum={cardNum}
              setCardNum={setCardNum}
              setIsVisible={setIsVisible}
            />
          ) : null}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
