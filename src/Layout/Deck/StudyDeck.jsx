import React, { useEffect, useState } from "react";
import { readDeck } from "../../utils/api";
import BreadCrumb from "../BreadCrumb";
import StudyCard from "../Card/StudyCard";

export default function StudyDeck({ decks, deck }) {
  const [cardAmount, setcardAmount] = useState();
  let tempCards = [];
  if (deck.cards !== undefined) {
    tempCards = deck.cards;
  }

  const [cards, setCards] = useState([...tempCards]);
  const deckId = deck.id;

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((result) => setCards(result.cards))
      .then(() => {
        setcardAmount(cards.length);
      })
      .catch(console.error);

    return () => abortController.abort();
  }, [deck, decks, cards.length, deckId]);
  return (
    <div>
      <BreadCrumb decks={decks} />
      <h2> {deck.name}: Study</h2>

      {cardAmount > 2 ? (
        <StudyCard cards={cards} />
      ) : (
        <div>
          <h3>Not Enough Cards.</h3>
          <p>
            You need at least 3 cards to study. There are only {cardAmount}{" "}
            cards in this deck.
          </p>
        </div>
      )}
    </div>
  );
}
