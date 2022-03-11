import React from "react";
import BreadCrumb from "../BreadCrumb";
import CardForm from "../Forms/CardForm";

export default function EditCard({ decks, deck, setDeck, deckUrl, setDecks }) {
  return (
    <div>
      <BreadCrumb decks={decks} />
      <h2>Edit Card</h2>
      <CardForm
        deck={deck}
        setDeck={setDeck}
        deckUrl={deckUrl}
        decks={decks}
        setDecks={setDecks}
      />
    </div>
  );
}
