import React from "react";
import BreadCrumb from "../BreadCrumb";
import CreateDeckForm from "../Forms/CreateDeckForm";

export default function CreateDeck({ decks, setDecks }) {
  return (
    <div>
      <BreadCrumb decks={decks} />
      <h2>Create Deck</h2>
      <CreateDeckForm decks={decks} setDecks={setDecks} />      
    </div>
  );
}
