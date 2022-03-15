import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../../utils/api/index";
import CardView from "./CardView";

export default function CardList({ deck, deckId, setDeck }) {
  const [cards, setCards] = useState([]);
  const deckID = useParams().deckId;

  useEffect(() => {
    setCards([])
    const abortController = new AbortController();
    if (deckID) {
      readDeck(deckID, abortController.signal)
        .then((result) => setCards(result.cards))
        .catch(console.error);
    }
    return () => abortController.abort();
  }, [deckID]);
  const list = cards.map((card, index) => (
    <CardView
      card={card}
      key={index}
      setCards={setCards}
      deck={deck}
      setDeck={setDeck}
    />
  ));

  return (
    <div>
      <h2>Cards</h2>
      {list}
    </div>
  );
}
