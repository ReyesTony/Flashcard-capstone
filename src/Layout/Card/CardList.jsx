import React, { useEffect, useState } from "react";
import { readDeck } from "../../utils/api/index";
import CardView from "./CardView";

export default function CardList({ deck, deckId, setDeck, decks, setDecks }) {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((result) => setCards(result.cards))
      .catch(console.error);

    return () => abortController.abort();
  }, [deck]);
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
