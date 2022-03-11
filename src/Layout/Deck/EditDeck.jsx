import React from "react";
import BreadCrumb from "../BreadCrumb";
import EditDeckForm from "../Forms/EditDeckForm";

export default function EditDeck({ decks, deck, setDeck, deckUrl, setDecks }) {
  return (
    <div>
      <BreadCrumb decks={decks} />
      <h2>Edit Deck</h2>
      <EditDeckForm
        deck={deck}
        setDeck={setDeck}
        deckUrl={deckUrl}
        decks={decks}
        setDecks={setDecks}
      />
    </div>
  );
}
