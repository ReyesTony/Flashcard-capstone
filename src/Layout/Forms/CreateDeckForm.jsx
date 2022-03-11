import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

export default function CreateDeckForm({ decks, setDecks }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [newDeck, setNewDeck] = useState({
    name: name,
    description: description,
  });
  const newDecks = decks;

  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const history = useHistory();
  useEffect(() => {
    setNewDeck({ name: name, description: description });
  }, [name, description]);
  function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    createDeck(newDeck, abortController.signal)
      .then((response) => {
        newDecks.push(response);
        setDecks(() => newDecks);
        history.push(`/decks/${response.id}`);
      })
      .catch(console.error);
    return () => abortController.abort();
  }
  return (
    <form name="createDeck" onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          onChange={handleNameChange}
          value={name}
          placeholder="Deck Name"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description </label>
        <textarea
          id="description"
          type="text"
          name="description"
          value={description}
          placeholder="Brief description of the deck"
          className="form-control"
          onChange={handleDescriptionChange}
        ></textarea>
      </div>
      <Link className="btn btn-secondary mr-1" to={`/`}>
        Cancel
      </Link>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
